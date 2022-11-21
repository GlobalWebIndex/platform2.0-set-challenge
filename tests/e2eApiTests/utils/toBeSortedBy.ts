import isSortedBy, { sortOptions } from './sorted';

expect.extend({
	toBeSortedBy(received: any, options: sortOptions) {
		const result = isSortedBy(received, options)
		const pass: boolean = result.pass;
		const message: () => string = () => pass ? '' : result.message();
		return {
			message,
			pass,
		};
	},
});

declare global {
	namespace jest {
		interface Matchers<R> {
			toBeSortedBy(options: sortOptions): R;
		}
	}
}
