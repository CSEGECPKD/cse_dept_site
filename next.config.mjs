const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://api.emailjs.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https:;
    font-src 'self' https://fonts.gstatic.com data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self' https://accounts.google.com;
    frame-src 'self' https://drive.google.com;
    connect-src 'self' ws: wss: https://*.ufs.sh https://ufs.sh https://utfs.io https://*.utfs.io https://uploadthing.com https://*.uploadthing.com https://api.emailjs.com https://www.googleapis.com https://accounts.google.com;
`
    .replace(/\s{2,}/g, ' ')
    .trim();

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        agentUpgrade: 'security',
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'utfs.io',
            },
            {
                protocol: 'https',
                hostname: '*.ufs.sh',
            },
            {
                protocol: 'https',
                hostname: 'ufs.sh',
            },
            {
                protocol: 'https',
                hostname: 'uploadthing.com',
            },
            {
                protocol: 'https',
                hostname: '*.uploadthing.com',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'drive.google.com',
            },
            {
                protocol: 'https',
                hostname: 'gecskp.etlab.in',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: cspHeader,
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains',
                    },
                ],
            },
        ];
    },
    async redirects() {
        return [
            {
                source: '/HomePage',
                destination: '/',
                permanent: true,
            },
        ];
    },
    async rewrites() {
        return {
            fallback: [
                {
                    source: '/:file(logo\\.png|logo\\(black\\)\\.png|cse\\.png|SIMPLE_logo\\.png|nba\\.svg|next\\.svg|vercel\\.svg)',
                    destination: '/branding/:file',
                },
                {
                    source: '/:file(acadamic-logo1\\.svg|acadamic-logo2\\.svg|acadamic-logo3\\.svg|btech-logo\\.png|btech-logo\\.svg|mtech-logo\\.png|mtech-logo\\.svg|placement-cell-logo\\.svg|profile-logo\\.svg|cap\\.png|computer\\.png|Mission\\.png|Vision\\.png)',
                    destination: '/icons/:file',
                },
                {
                    source: '/:file(cognizant\\.jpg|experion\\.jpg|keltron\\.jpg|LandT\\.jpg|pennyflo\\.jpg|qburst\\.jpg|tata\\.jpg|tataConsult\\.jpg|ust\\.jpg|xyvin\\.jpg|zendalona\\.jpg|Adobe\\.svg|Airbnb\\.svg|Amazon\\.svg|Canva\\.svg|Descript\\.svg|Discord\\.svg|Dropbox\\.svg|GitLab\\.svg|IBM\\.svg|LinkedIn\\.svg|Microsoft\\.svg|OLX\\.svg|Pinterest\\.svg|Reddit\\.svg)',
                    destination: '/recruiters/:file',
                },
                {
                    source: '/:file(ali\\.jpeg|amal\\.jpg|bimal\\.jpeg|hashiq\\.jpg|jerald\\.jpeg|nishan\\.jpeg|rohini\\.jpg|viswa\\.jpg|s\\.jpg|hodImage\\.jpg|student-1\\.jpg|teams\\.png)',
                    destination: '/people/:file',
                },
                {
                    source: '/:file(cse-association-execom-2026-27\\.jpg|activity1\\.png|activity2\\.png|coderelay\\.jpeg|expo\\.jpeg|gdg\\.jpg|ideaintoproduct\\.jpeg|mulearn\\.webp|notify\\.jpg|quanta\'22\\.png|tinkerhub\\.jpg|void-minds\\.jpg)',
                    destination: '/events/:file',
                },
                {
                    source: '/:file(history1\\.png|history2\\.png)',
                    destination: '/history/:file',
                },
                {
                    source: '/:file(error-cap\\.png|errorComputer\\.png|error-computer\\.png|error-computer-white\\.png|error-cse\\.png|error-cse-hover\\.png)',
                    destination: '/errors/:file',
                },
                {
                    source: '/:file(bg\\.mp4|frontVid\\.mp4|bg\\.png|bg-acadamic\\.jpeg)',
                    destination: '/media/:file',
                },
                {
                    source: '/:file(arrow\\.png|down-arrow-black\\.png|down-arrow-white\\.png|border-circle\\.svg|circle-line\\.svg|circle-line-half\\.svg|placeholder-image\\.jpeg|placeholder-image\\.jpg)',
                    destination: '/ui/:file',
                },
                {
                    source: '/:file(blog\\.jpg|blog\\.png|blog\\.webp)',
                    destination: '/blog/:file',
                },
                {
                    source: '/:file(gallery1\\.png|gallery2\\.png|gallery3\\.png)',
                    destination: '/gallery/:file',
                },
            ],
        };
    },
};

export default nextConfig;
