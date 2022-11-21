import { orderByInJS, sortingOrder } from '../../types';

const defaultCompare = (a, b) => {
	if (a > b) {
		return 1;
	}
	if (a < b) {
		return -1;
	}
	return 0;
};

export interface sortOptions {
	order: sortingOrder,
	key: orderByInJS,
}

const isSortedBy = (received, options: sortOptions) => {
	if (!received[Symbol.iterator]) {
		return {
			pass: false,
			message: () => `${received} is not iterable and cannot be sorted`,
		};
	}
	const iterable = [...received];
	const descending = options.order === sortingOrder.descending;
	const descMult = descending ? -1 : 1;
	const arrayMsg = options.key ? `Array(${iterable.length})` : `[${iterable}]`;
	const orderMsg = descending ? 'descending' : 'ascending';
	let keyMsg = options.key ? `by ${options.key} ` : '';
	let failingElements = '';

	let pass = true;

	for (let i = 0; i < iterable.length - 1; i++) {
		let ele = iterable[i];
		let nextEle = iterable[i + 1];
		if (options.key) {
			ele = ele[options.key];
			nextEle = nextEle && nextEle[options.key];
		}
		if (descMult * defaultCompare(ele, nextEle) > 0) {
			pass = false;
			const eleOrder = descending ? 'before' : 'after';
			const strEle = JSON.stringify(ele);
			const strNextEle = JSON.stringify(nextEle);
			failingElements = `Expected ${strEle} to be ${eleOrder} ${strNextEle}`;
			break;
		}
	}
	const passMsg = pass ? 'not ' : '';
	const errMsg = `Expected ${arrayMsg} to ${passMsg}be sorted ${keyMsg}in ${orderMsg} order -> \n${JSON.stringify(failingElements)}`;
	return {
		pass,
		message: () => errMsg,
	};
};

export default isSortedBy
