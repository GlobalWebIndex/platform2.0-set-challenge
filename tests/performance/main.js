import { sleep } from 'k6';
import { chartsScenarios } from './charts.js';
import { mainOptions } from './options.js';

export let options = mainOptions;

export default function () {
	chartsScenarios();
	sleep(1);
}
