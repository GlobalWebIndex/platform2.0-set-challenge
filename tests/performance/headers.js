export const defaultHeaders = (scenario) => {
	return {
		'Accept': '*/*',
		'Content-Type': 'application/json',
		'x-test-scenario': scenario,
		'User-Agent': 'K6',
	};
};
