import ChartsClient from './utils/chartsClient';
import { StatusCodes } from 'http-status-codes';
import { orderByInJS, orderByReq, orderByRequestMap, sortingOrder } from '../types';
import Ajv from 'ajv';
import './utils/toBeSortedBy';

describe('The charts controller', () => {
	let chartsClient: ChartsClient;

	beforeAll(async () => {
		chartsClient = new ChartsClient();
	});

	it('verifies route exists', async () => {
		const response = await chartsClient.getCharts(
			{
				orderBy: orderByReq.chartName,
				order: sortingOrder.ascending
			}
		)
		expect(response.status).not.toBe(StatusCodes.NOT_FOUND);
		expect(response.status).toBe(StatusCodes.OK);
	});

	describe('returning http status code: 4XX', () => {
		it('should return bad request because of query validation - wrong orderBy value', async () => {
			const response = await chartsClient.getCharts(
				{
					orderBy: 'Test' as orderByReq,
					order: sortingOrder.ascending
				}
			)
			expect(response.status).toBe(StatusCodes.BAD_REQUEST);
			expect(response.body).toMatchObject({ error: 'Please check your request parameters' });
		});

		it('should return not found for a non-valid url', async () => {
			const response = await chartsClient.getCharts4xx();
			expect(response.status).toBe(StatusCodes.NOT_FOUND);
		});
	});

	describe('returning http status code: 5XX', () => {
		it('should return error when case not implemented', async () => {
			const response = await chartsClient.getCharts(
				{
					orderBy: orderByReq.creationDate,
					order: sortingOrder.descending
				}
			)
			expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
			// expect(response.status).toBe(StatusCodes.NOT_IMPLEMENTED);
			expect(response.body).toMatchObject({ error: 'Currently no order by dateCreated descending has been implemented' });
		});
	});

	describe('charts GET request', () => {
		it('should return correct JSON schema', async () => {
			let ajv = new Ajv();
			const response = await chartsClient.getCharts(
				{
					orderBy: orderByReq.chartName,
					order: sortingOrder.ascending
				}
			)
			const schema = {
				type: 'object',
				properties: {
					charts: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								name: {'type': 'string'},
								created_at: {'type': 'integer'},
								modified_at: {'type': 'integer'}
							},
							required: ['name', 'created_at', 'modified_at'],
							additionalProperties: false
						}
					}
				},
				required: ['charts'],
				additionalProperties: false
			}
			expect(response.status).toBe(StatusCodes.OK);
			expect(ajv.validate(schema, response.body)).toBeTruthy();
		});

		const testCases = [
			{
				orderBy: orderByInJS.chartName,
				order: sortingOrder.ascending
			},
			{
				orderBy: orderByInJS.chartName,
				order: sortingOrder.descending
			},
			{
				orderBy: orderByInJS.creationDate,
				order: sortingOrder.ascending
			},
			{
				orderBy: orderByInJS.creationDate,
				order: sortingOrder.descending
			},
			{
				orderBy: orderByInJS.modificationDate,
				order: sortingOrder.ascending
			},
			{
				orderBy: orderByInJS.modificationDate,
				order: sortingOrder.descending
			}
		];

		//There is a failure here on creationDate/Descending:
		//Currently no order by dateCreated descending has been implemented
		it.each(testCases)
		('should return correctly sorted when %s', async (testCase) => {
			const response = await chartsClient.getCharts(
				{
					orderBy: orderByRequestMap(testCase.orderBy),
					order: testCase.order
				}
			)
			expect(response.status).toBe(StatusCodes.OK);

			expect(response.body.charts).toBeSortedBy({
				order: testCase.order,
				key: testCase.orderBy
			})
		});
	});
});
