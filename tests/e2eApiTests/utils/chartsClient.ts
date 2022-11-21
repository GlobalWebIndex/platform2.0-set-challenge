import request from 'supertest';
import {orderByReq, sortingOrder} from '../../types';
import {getBaseUrl} from './config';

export class chartsClient {
	private _url: string = getBaseUrl();

	private headers = {
		Accept: '*/*',
		'User-Agent': 'jest-api-tests'
	}

	public getCharts = (options: {
		orderBy?: orderByReq;
		order?: sortingOrder;
	}): request.Test => {
		const chartsRequest = request(this._url).get('/api/charts').query(options);
		chartsRequest.set(this.headers);
		return chartsRequest;
	};

	public getCharts4xx = (): request.Test => {
		const chartsRequest = request(this._url).get('/api/charts/test');
		chartsRequest.set(this.headers);
		return chartsRequest;
	};


}

export default chartsClient;
