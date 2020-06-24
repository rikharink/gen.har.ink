module.exports = {
    plugins: [
        require('postcss-import')({
            path: [`src/styles`],
        }),
        require('rucksack-css')({}),
        require('postcss-preset-env')({
            stage: 3,
            autoprefixer: { grid: true },
            features: {
                'nesting-rules': true,
            },
        }),
    ],
};
