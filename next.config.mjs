/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'image-hub-proj.s3.eu-north-1.amazonaws.com',
            port: '',
            pathname: '/**',
          },
        ],
    },
};

export default nextConfig;
