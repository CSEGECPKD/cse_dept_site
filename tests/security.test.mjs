import test from 'node:test';
import assert from 'node:assert/strict';
import { isSafeUrl } from '../src/lib/security.js';

test('Security: SSRF URL Protection', async (t) => {
    await t.test('rejects non-https protocols', () => {
        assert.equal(isSafeUrl('http://drive.google.com/test.jpg'), false);
        assert.equal(isSafeUrl('ftp://example.com/test.jpg'), false);
        assert.equal(isSafeUrl('file:///etc/passwd'), false);
        assert.equal(isSafeUrl('javascript:alert(1)'), false);
    });

    await t.test('rejects localhost and loopback domains', () => {
        assert.equal(isSafeUrl('https://localhost/test.jpg'), false);
        assert.equal(isSafeUrl('https://localhost:3000/test.jpg'), false);
        assert.equal(isSafeUrl('https://app.localhost/test.jpg'), false);
        assert.equal(isSafeUrl('https://server.local/test.jpg'), false);
        assert.equal(isSafeUrl('https://cluster.internal/test.jpg'), false);
    });

    await t.test('rejects private IPv4 ranges (RFC 1918 & Cloud Metadata)', () => {
        // 127.0.0.0/8 (Loopback)
        assert.equal(isSafeUrl('https://127.0.0.1/image.jpg'), false);
        assert.equal(isSafeUrl('https://127.0.0.254/image.jpg'), false);

        // 10.0.0.0/8 (Private)
        assert.equal(isSafeUrl('https://10.0.0.1/image.jpg'), false);
        assert.equal(isSafeUrl('https://10.255.255.255/image.jpg'), false);

        // 172.16.0.0/12 (Private)
        assert.equal(isSafeUrl('https://172.16.0.1/image.jpg'), false);
        assert.equal(isSafeUrl('https://172.31.255.255/image.jpg'), false);

        // 192.168.0.0/16 (Private)
        assert.equal(isSafeUrl('https://192.168.1.1/image.jpg'), false);
        assert.equal(isSafeUrl('https://192.168.0.100/image.jpg'), false);

        // 169.254.0.0/16 (Cloud Metadata / AWS / Azure / GCP)
        assert.equal(isSafeUrl('https://169.254.169.254/latest/meta-data'), false);
        assert.equal(isSafeUrl('https://169.254.1.1/test'), false);
    });

    await t.test('rejects IPv6 loopback and link-local', () => {
        assert.equal(isSafeUrl('https://[::1]/image.jpg'), false);
        assert.equal(isSafeUrl('https://[fe80::1]/image.jpg'), false);
    });

    await t.test('accepts valid public HTTPS URLs', () => {
        assert.equal(isSafeUrl('https://drive.google.com/uc?id=12345'), true);
        assert.equal(isSafeUrl('https://images.unsplash.com/photo-123'), true);
        assert.equal(isSafeUrl('https://utfs.io/f/sample-image.jpg'), true);
    });
});
