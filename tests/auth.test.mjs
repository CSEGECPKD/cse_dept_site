import test from 'node:test';
import assert from 'node:assert/strict';

function isEmailAuthorized(email, allowlistEnv) {
    if (!email || !allowlistEnv) return false;
    const allowed = allowlistEnv
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);
    return allowed.includes(email.trim().toLowerCase());
}

test('Auth: Email Allowlist Verification', async (t) => {
    const mockEnv = 'admin@college.edu, HOD@COLLEGE.EDU, faculty.lead@college.edu ';

    await t.test('authorizes matching email regardless of casing or whitespace', () => {
        assert.equal(isEmailAuthorized('admin@college.edu', mockEnv), true);
        assert.equal(isEmailAuthorized('ADMIN@COLLEGE.EDU', mockEnv), true);
        assert.equal(isEmailAuthorized(' hod@college.edu ', mockEnv), true);
        assert.equal(isEmailAuthorized('faculty.lead@college.edu', mockEnv), true);
    });

    await t.test('rejects non-allowlisted emails', () => {
        assert.equal(isEmailAuthorized('attacker@evil.com', mockEnv), false);
        assert.equal(isEmailAuthorized('student@college.edu', mockEnv), false);
        assert.equal(isEmailAuthorized('', mockEnv), false);
        assert.equal(isEmailAuthorized(null, mockEnv), false);
    });

    await t.test('fails closed when allowlist env is missing or empty', () => {
        assert.equal(isEmailAuthorized('admin@college.edu', ''), false);
        assert.equal(isEmailAuthorized('admin@college.edu', undefined), false);
    });
});
