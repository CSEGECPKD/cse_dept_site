import test from 'node:test';
import assert from 'node:assert/strict';
import {
    facultySchema,
    blogSchema,
    eventSchema,
    magazineSchema,
} from '../src/lib/validations/index.js';

test('Validation: Core Schema Enforcement', async (t) => {
    await t.test('facultySchema validates correct payload', () => {
        const valid = {
            name: 'Dr. John Doe',
            designation: 'Associate Professor',
            employeeType: 'Faculty',
            dateOfJoining: '2020-01-15',
            email: 'john.doe@example.com',
            phone: '+91 9876543210',
            imageUrl: 'https://example.com/photo.jpg',
        };
        const result = facultySchema.safeParse(valid);
        assert.equal(result.success, true);
    });

    await t.test('facultySchema rejects invalid email or missing fields', () => {
        const invalid = {
            name: 'Dr. John Doe',
            designation: 'Professor',
            employeeType: 'Faculty',
            dateOfJoining: '2020-01-15',
            email: 'not-an-email',
            phone: '12345',
        };
        const result = facultySchema.safeParse(invalid);
        assert.equal(result.success, false);
    });

    await t.test('blogSchema validates correctly', () => {
        const valid = {
            name: 'AI in 2026',
            authorName: 'Jane Doe',
            type: 'Technology',
        };
        const result = blogSchema.safeParse(valid);
        assert.equal(result.success, true);
        assert.equal(result.data.authorPosition, '');
    });

    await t.test('eventSchema validates and defaults posters', () => {
        const valid = {
            name: 'Tech Symposium',
            date: '2026-11-20',
            details: 'Annual CSE symposium',
            mode: 'In-person',
        };
        const result = eventSchema.safeParse(valid);
        assert.equal(result.success, true);
        assert.deepEqual(result.data.posters, []);
    });

    await t.test('magazineSchema requires title and category', () => {
        const result = magazineSchema.safeParse({
            title: '',
            category: 'Tech',
            date: '2026-05',
            driveUrl: 'https://example.com/doc.pdf',
        });
        assert.equal(result.success, false);
    });
});
