import { defaultHeaders } from './headers.js';
import { check, group } from 'k6';
import http from 'k6/http';

export function chartsScenarios() {
	group('Charts', () => {
		const chartsApiEndpoint = 'http://localhost:3000/api'

		group('GET Charts', () => {
			const chartsRequestParams = {
				orderBy: 'name',
				order: 'asc',
			};
			const getChartsUrl = `${chartsApiEndpoint}/charts?orderBy=${chartsRequestParams.orderBy}&order=${chartsRequestParams.order}`;
			const res = http.get(getChartsUrl, {
				headers: defaultHeaders('getCharts'),
				tags: {
					queryName: `GET: ${getChartsUrl}`,
				},
				redirects: 5,
				responseType: 'text',
				timeout: 10000,
			});
			check(res, {
				'is status 200': r => r.status === 200,
				'has no errors': r => ! r.json().hasOwnProperty('error'),
				'body size is greater than 0': r => r.body.length > 0,
				'the array of charts is not empty': r => JSON.parse(r.body).charts[0].hasOwnProperty('created_at')
			});
		});
	});
}
