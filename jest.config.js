export default {
	collectCoverage: false,
	testEnvironment: 'node',
	testMatch: [
		'**/?(*.)spec.ts'
	],
	transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
	verbose: true,
};
