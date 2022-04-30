const nextConfig = {
    reactStrictMode: true,
    compress: true,
    typescript: {
        tsconfigPath: './tsconfig.json'
    },
    swcMinify: true,
    sassOptions: {
        includePaths: ['./src'],
        prependData: '@import "Styles/vars.scss";'
    },
    compiler: {
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
        config.module.rules.push({
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            use: [
                'graphql-tag/loader',
                'minify-graphql-loader'
            ]
        });

        return config;
    }
};

module.exports = nextConfig;
