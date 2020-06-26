module.exports = {
    projects: [
        {
            displayName: 'test',
            preset: 'ts-jest',
            testEnvironment: 'jsdom',
            testMatch: ['**/?(*.)+(spec|test).[t]s'],
        },
    ],
};
