export const mainOptions = {
	discardResponseBodies: false,
	summaryTrendStats: ['min' ,'avg','med','p(95)','p(99)','p(99.9)','max','count'],
	vus: 10,
	duration: '30s',
	thresholds: {
		http_req_duration: ['p(95)<2500', 'med<2000', 'p(99)<4000'],
		http_req_waiting: ['p(95)<5000'],
		http_req_failed: ['rate<0.01'],
		checks: ['rate>0.99'],
	}
}
