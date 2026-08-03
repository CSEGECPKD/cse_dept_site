'use server';

import { UTApi, UTFile } from 'uploadthing/server';

import dbConnect from '../lib/db';
import Faculty from '../lib/models/Faculty';
import { isAuthenticated } from '../lib/auth';

const utapi = new UTApi();

export async function getFaculties() {
    try {
        await dbConnect();
        const faculties = await Faculty.find({});
        return JSON.parse(JSON.stringify(faculties));
    } catch (error) {
        console.error('Failed to fetch faculties:', error);
        throw new Error('Failed to fetch faculties');
    }
}

export async function getFacultyById(facultyId) {
    try {
        await dbConnect();
        const faculty = await Faculty.findById(facultyId);
        if (!faculty) {
            throw new Error('Employee not found');
        }
        return JSON.parse(JSON.stringify(faculty));
    } catch (error) {
        console.error('Failed to fetch employee:', error);
        throw new Error('Failed to fetch employee');
    }
}

export async function createFaculty({
    name,
    designation,
    employeeType,
    dateOfJoining,
    email,
    phone,
    imageUrl,
}) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const normalizedEmail = email.trim().toLowerCase();
        const duplicate = await Faculty.findOne({ email: normalizedEmail });
        if (duplicate) {
            throw new Error('An employee with this email already exists');
        }
        const newFaculty = new Faculty({
            name,
            designation,
            employeeType,
            dateOfJoining,
            email: normalizedEmail,
            phone,
            imageUrl: imageUrl || '',
        });
        await newFaculty.save();
        return {
            message: 'Created Succesfully',
        };
    } catch (error) {
        console.error('Failed to create faculty:', error);
        throw new Error('Failed to create faculty');
    }
}

export async function updateFaculty(
    facultyId,
    { name, designation, employeeType, dateOfJoining, email, phone, imageUrl }
) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const normalizedEmail = email.trim().toLowerCase();
        const duplicate = await Faculty.findOne({
            email: normalizedEmail,
            _id: { $ne: facultyId },
        });
        if (duplicate) {
            throw new Error('An employee with this email already exists');
        }
        const updatedFaculty = await Faculty.findByIdAndUpdate(
            facultyId,
            {
                name,
                designation,
                employeeType,
                dateOfJoining,
                email: normalizedEmail,
                phone,
                imageUrl: imageUrl || '',
            },
            { new: true }
        );
        if (!updatedFaculty) {
            throw new Error('Employee not found');
        }
        return { message: 'Updated successfully' };
    } catch (error) {
        console.error('Failed to update faculty:', error);
        throw new Error('Failed to update faculty');
    }
}

export async function deleteFaculty(facultyId) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();
        const deletedFaculty = await Faculty.findByIdAndDelete(facultyId);
        if (!deletedFaculty) {
            throw new Error('Faculty not found');
        }
        return { message: 'Faculty deleted successfully' };
    } catch (error) {
        console.error('Failed to delete faculty:', error);
        throw new Error('Failed to delete faculty');
    }
}

export async function importFaculties(rows) {
    try {
        if (!(await isAuthenticated())) {
            throw new Error('Unauthorized');
        }
        await dbConnect();

        const summary = {
            total: rows.length,
            imported: 0,
            skipped: 0,
            errors: [],
        };

        const emails = rows
            .map((row) => String(row?.email ?? '').trim().toLowerCase())
            .filter(Boolean);
        const existing = await Faculty.find({
            email: { $in: emails },
        }).select('email');
        const existingEmails = new Set(existing.map((e) => e.email));
        const seenInFile = new Set();

        for (let index = 0; index < rows.length; index++) {
            const row = normalizeRow(rows[index]);
            const rowNumber = index + 2;

            const fieldErrors = validateRow(row);
            if (fieldErrors.length > 0) {
                summary.skipped++;
                summary.errors.push({
                    row: rowNumber,
                    type: 'error',
                    message: fieldErrors.join('; '),
                });
                continue;
            }

            const email = row.email.toLowerCase();
            if (existingEmails.has(email)) {
                summary.skipped++;
                summary.errors.push({
                    row: rowNumber,
                    type: 'error',
                    message: `Duplicate email: ${email}`,
                });
                continue;
            }
            if (seenInFile.has(email)) {
                summary.skipped++;
                summary.errors.push({
                    row: rowNumber,
                    type: 'error',
                    message: `Duplicate email within file: ${email}`,
                });
                continue;
            }
            seenInFile.add(email);

            let imageUrl = row.imageUrl || '';
            if (imageUrl) {
                try {
                    imageUrl = await uploadPhoto(imageUrl);
                } catch (error) {
                    summary.errors.push({
                        row: rowNumber,
                        type: 'warning',
                        message: `Could not import photo: ${error.message}`,
                    });
                    imageUrl = '';
                }
            }

            await Faculty.create({
                name: row.name,
                designation: row.designation,
                employeeType: row.employeeType,
                dateOfJoining: row.dateOfJoining,
                email,
                phone: row.phone,
                imageUrl,
            });
            summary.imported++;
        }

        return summary;
    } catch (error) {
        console.error('Failed to import faculties:', error);
        throw new Error('Failed to import faculties');
    }
}

function normalizeRow(raw) {
    return {
        name: String(raw?.name ?? '').trim(),
        designation: String(raw?.designation ?? '').trim(),
        employeeType: String(raw?.employeeType ?? '').trim(),
        dateOfJoining: normalizeDate(raw?.dateOfJoining),
        email: String(raw?.email ?? '').trim(),
        phone: String(raw?.phone ?? '').trim(),
        imageUrl: String(raw?.imageUrl ?? '').trim(),
    };
}

function normalizeDate(value) {
    if (value instanceof Date && !isNaN(value)) {
        return value.toISOString().slice(0, 10);
    }
    const str = String(value ?? '').trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(str) && !isNaN(new Date(str))) {
        return str;
    }
    return '';
}

function validateRow(row) {
    const errors = [];
    if (!row.name) errors.push('Missing Full Name');
    if (!row.designation) errors.push('Missing Designation');
    if (!row.employeeType) errors.push('Missing Employee Type');
    if (!row.dateOfJoining) {
        errors.push('Invalid or missing Date of Joining');
    }
    if (!row.email) {
        errors.push('Missing Email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
        errors.push('Invalid Email');
    }
    if (!row.phone) errors.push('Missing Phone Number');
    return errors;
}

function extractDriveId(url) {
    let match = url.match(/[?&]id=([\w-]+)/);
    if (match) return match[1];
    match = url.match(/\/file\/d\/([\w-]+)/);
    if (match) return match[1];
    match = url.match(/\/d\/([\w-]+)/);
    if (match) return match[1];
    return null;
}

async function downloadDriveImage(url) {
    const id = extractDriveId(url);
    const candidates = id
        ? [
              `https://drive.google.com/thumbnail?id=${id}&sz=w2000`,
              `https://drive.google.com/uc?export=download&id=${id}`,
          ]
        : [url];

    for (const candidate of candidates) {
        try {
            const response = await fetch(candidate, { redirect: 'follow' });
            if (!response.ok) continue;
            const contentType = response.headers.get('content-type') || '';
            if (!contentType.startsWith('image/')) continue;
            const buffer = Buffer.from(await response.arrayBuffer());
            if (buffer.length === 0) continue;
            return { buffer, contentType };
        } catch (error) {
            continue;
        }
    }
    throw new Error('Could not download image from the provided link');
}

async function uploadPhoto(url) {
    const { buffer, contentType } = await downloadDriveImage(url);
    const file = new UTFile([buffer], `employee-${Date.now()}.jpg`, {
        type: contentType || 'image/jpeg',
    });
    const result = await utapi.uploadFiles(file);
    const uploaded = Array.isArray(result) ? result[0] : result;
    if (!uploaded?.data?.url) {
        throw new Error('UploadThing upload failed');
    }
    return uploaded.data.url;
}
