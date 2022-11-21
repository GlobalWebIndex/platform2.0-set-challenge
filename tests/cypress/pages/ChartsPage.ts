import MasterPage from './MasterPage';

class ChartsPage extends MasterPage {
    protected _url = '/';

    constructor() {
        super();
    }

	get tableRoot() {
		return cy.findByTestId('tableRoot');
	}

	get searchInput() {
		return cy.findByPlaceholderText('Search charts');
	}

	get createChartButton() {
		return cy.contains('Create a chart');
	}

	get shortByNameButton() {
		return this.tableRoot.findByTestId('shortByName');
	}

	get shortByCreationDateButton() {
		return this.tableRoot.findByTestId('shortByCreationDate');
	}

	get shortByModificationDateButton() {
		return this.tableRoot.findByTestId('shortByModificationDate');
	}

	get tableRows() {
		return this.tableRoot.findAllByTestId('dataRow');
	}

	get nameCellId() {
		return 'chartName'
	}

	get creationCellId() {
		return 'chartCreated'
	}
	get modificationCellId() {
		return 'chartLastMod'
	}
}

export default ChartsPage;
