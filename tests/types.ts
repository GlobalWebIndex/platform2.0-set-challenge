export enum sortingOrder {
	ascending = 'asc',
	descending = 'desc',
}

export enum orderByInJS {
	chartName = 'name',
	creationDate = 'created_at',
	modificationDate = 'modified_at'
}

export enum orderByReq {
	chartName = 'name',
	creationDate = 'dateCreated',
	modificationDate = 'dateModified'
}

export function orderByRequestMap(orderByJS: orderByInJS) {
	if(orderByJS === orderByInJS.chartName) return orderByReq.chartName;
	if(orderByJS === orderByInJS.creationDate) return orderByReq.creationDate;
	if(orderByJS === orderByInJS.modificationDate) return orderByReq.modificationDate;
}

export interface tableRow {
	chartName: string,
	chartCreationDate: string,
	chartModificationDate: string
}
