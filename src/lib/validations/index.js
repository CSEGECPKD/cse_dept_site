import { z } from 'zod';

export const facultySchema = z.object({
    name: z.string().trim().min(1, 'Employee name is required'),
    designation: z.string().trim().min(1, 'Designation is required'),
    employeeType: z.string().trim().min(1, 'Employee type is required'),
    dateOfJoining: z.string().trim().min(1, 'Date of joining is required'),
    email: z.string().trim().email('Enter a valid email address'),
    phone: z.string().trim().min(1, 'Phone number is required'),
    imageUrl: z.string().optional().default(''),
});

export const blogSchema = z.object({
    name: z.string().trim().min(1, 'Blog title is required'),
    authorName: z.string().trim().min(1, 'Author name is required'),
    type: z.string().trim().min(1, 'Blog category is required'),
    authorPosition: z.string().trim().optional().default(''),
    authorImage: z.string().optional().default(''),
    authorLinkedin: z.string().optional().default(''),
});

export const eventSchema = z.object({
    name: z.string().trim().min(1, 'Event name is required'),
    date: z
        .union([z.string(), z.date()])
        .transform((val) => (val instanceof Date ? val.toISOString() : String(val))),
    details: z.string().trim().min(1, 'Details are required'),
    mode: z.string().trim().min(1, 'Mode is required'),
    posters: z.array(z.string()).optional().default([]),
    regLinks: z
        .union([z.string(), z.array(z.string())])
        .optional()
        .default(''),
});

export const magazineSchema = z.object({
    name: z.string().trim().min(1, 'Magazine name is required'),
    category: z.string().trim().min(1, 'Category is required'),
    date: z.string().trim().min(1, 'Date is required'),
    description: z.string().optional().default(''),
    pdfUrl: z.string().optional().default(''),
    frontPageUrl: z.string().optional().default(''),
});
