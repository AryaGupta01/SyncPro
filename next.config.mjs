/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
          allowedForwardedHosts: ['my-forwarded-host.com'],
        },
      },
};

// experimental: {
//     serverActions: {
//       // edit: updated to new key. Was previously `allowedForwardedHosts`
//       allowedOrigins: ['my-forwarded-host.com'],
//     },
//   },

export default nextConfig;
