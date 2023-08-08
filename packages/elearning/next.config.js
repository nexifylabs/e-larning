/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    swcMinify: true,
    trailingSlash: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    optimizeFonts: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        GETNET_CHECKOUT_ENDPOINT:
            'https://api.getnet.com.br/auth/oauth/v2/token',
        BASIC_AUTH_GETNET:
            'Basic NTg1ZGMwYmMtN2Y0OS00NWRlLTk2OGItNTk0M2VhMThmMjI4OjIzMTI1NDk5LWNkYzYtNGFjOC1hOGZlLWVmY2UwMmVmMmRlNQ==',
        JWT_SECRET: process.env.JWT_SECRET,
        CLOUD_NAME: 'dnneps5fo',
        UPLOAD_PRESETS: 'images',
        CLOUDINARY_URL:
            'https://api.cloudinary.com/v1_1/dnunzwnex/image/upload',
        CLOUDINARY_VIDEO_URL:
            'https://api.cloudinary.com/v1_1/dnunzwnex/video/upload',
        CLOUDINARY_ZIP_URL:
            'https://api.cloudinary.com/v1_1/dnneps5f/raw/upload?api_key=284888778249526',
    },
    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.json$/,
            loader: 'json-loader',
            type: 'javascript/auto',
        });
        return config;
    },
};

module.exports = {
    i18n: {
        locales: ['en', 'es', 'pt'],
        defaultLocale: 'en',
    },
};

module.exports = nextConfig;
