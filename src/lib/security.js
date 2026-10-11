/**
 * Security helper to validate URLs against SSRF (Server-Side Request Forgery).
 * Blocks non-HTTPS schemes, localhost, private IP ranges (RFC 1918),
 * link-local/cloud metadata IP ranges (169.254.0.0/16), and IPv6 loopback/link-local.
 */
export function isSafeUrl(rawUrl) {
    try {
        const parsed = new URL(rawUrl);
        if (parsed.protocol !== 'https:') {
            return false;
        }
        const hostname = parsed.hostname.toLowerCase();

        // Disallow localhost and internal local patterns
        if (
            hostname === 'localhost' ||
            hostname.endsWith('.local') ||
            hostname.endsWith('.internal') ||
            hostname.endsWith('.localhost')
        ) {
            return false;
        }

        // Disallow private / loopback / link-local IP addresses (IPv4)
        const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
        const match = hostname.match(ipv4Regex);
        if (match) {
            const [, a, b, c, d] = match.map(Number);
            if (a > 255 || b > 255 || c > 255 || d > 255) return false;
            if (a === 127) return false; // Loopback
            if (a === 10) return false; // Private 10.0.0.0/8
            if (a === 172 && b >= 16 && b <= 31) return false; // Private 172.16.0.0/12
            if (a === 192 && b === 168) return false; // Private 192.168.0.0/16
            if (a === 169 && b === 254) return false; // Link-local / Cloud metadata 169.254.0.0/16
            if (a === 0 || a >= 224) return false; // Reserved / Broadcast / Multicast
        }

        // Disallow IPv6 loopback and private/link-local ranges
        if (hostname.startsWith('[') || hostname.includes(':')) {
            if (
                hostname.includes('::1') ||
                hostname.includes('fe80:') ||
                hostname.includes('fc00:') ||
                hostname.includes('fd00:')
            ) {
                return false;
            }
        }

        return true;
    } catch {
        return false;
    }
}
