// @ts-check
/**
 * @interface {import('next').NextConfig}
 * */

const nextConfig = {
    reactStrictMode: true,
    compress: true,
    webpack5: true,
    typescript: {
        tsconfigPath: './tsconfig.json'
    },
    swcMinify: true,
    sassOptions: {
        includePaths: ['./src'],
        prependData: '@import "Styles/vars.scss";'
    },
    compiler: {
        // reactRemoveProperties: true,
        // removeConsole: true,
        remove: ''
    },
    i18n: {
        locales: ['en', 'cn', 'de', 'es', 'it', 'fr', 'ru', 'ua'],
        defaultLocale: 'en',
        localeDetection: false
    },
    images: {
        domains: [process.env.NEXT_PUBLIC_API_URL.replace('https://', '')]
    },
    webpack: (config) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        config.module.rules.push({
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            use: [
                'graphql-tag/loader',
                'minify-graphql-loader'
            ]
        });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return config;
    }
};

module.exports = nextConfig;
