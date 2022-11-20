import ChartsPage from '../pages/ChartsPage';

describe('WHEN I navigate to the Charts page', () => {
	const chartsPage = new ChartsPage();

	beforeEach(() => {
		chartsPage.open();
		cy.intercept({
			method: 'GET',
			url: '/api/charts',
			hostname: 'localhost',
		}).as('getCharts');
	});

	it('Should sort the charts correctly', () => {
		//Default Behaviour (By Name)
		cy.verifyChartsOrderAndName(
			['Chart 1', 'Chart 2', 'Chart 5', 'My awesome test 4', 'Test 3', ]
		);
		chartsPage.tableRows.first().verifyTableRow({
			chartName: 'Chart 1',
			chartCreationDate: '13 Sep 2021',
			chartModificationDate: '13 Sep 2021'
		})
		chartsPage.tableRows.last().verifyTableRow({
			chartName: 'Test 3',
			chartCreationDate: '13 Jul 2021',
			chartModificationDate: '13 Jul 2021'
		})
		chartsPage.shortByCreationDateButton.click();
		cy.wait('@getCharts');
		cy.verifyChartsOrderAndName(
			['Chart 2', 'Chart 5', 'My awesome test 4', 'Test 3', 'Chart 1']
		);
		chartsPage.shortByModificationDateButton.click();
		cy.wait('@getCharts');
		cy.verifyChartsOrderAndName(
			['Chart 5', 'My awesome test 4', 'Test 3', 'Chart 2', 'Chart 1']
		);
		chartsPage.shortByNameButton.click();
		cy.wait('@getCharts');
		cy.verifyChartsOrderAndName(
			['Chart 1', 'Chart 2', 'Chart 5', 'My awesome test 4', 'Test 3']
		);
	})

	it('Sort charts correctly by creation date -- Unknown Charts', () => {
		chartsPage.shortByCreationDateButton.click();
		cy.wait('@getCharts');
		chartsPage.tableRows
			.verifyChartsSortedBy(chartsPage.creationCellId, true);
	});

	//Test failing: not sorting by modification date. There is a bug in List.tsx file
	it('Sort charts correctly by modification date -- Unknown Charts', () => {
		chartsPage.shortByModificationDateButton.click();
		cy.wait('@getCharts');
		chartsPage.tableRows
			.verifyChartsSortedBy(chartsPage.modificationCellId, true);
	});

	it('Sort charts correctly by name -- Unknown Charts', () => {
		//Should be already sorted by name
		chartsPage.tableRows
			.verifyChartsSortedBy(chartsPage.nameCellId, false);
		//Check again to test the button
		chartsPage.shortByModificationDateButton.click();
		cy.wait('@getCharts');
		chartsPage.shortByNameButton.click()
		cy.wait('@getCharts');
		chartsPage.tableRows
			.verifyChartsSortedBy(chartsPage.nameCellId, false);
	});

	it('Should search for charts', () => {
		cy.verifyChartsOrderAndName(
			['Chart 1', 'Chart 2', 'Chart 5', 'My awesome test 4', 'Test 3']
		);
		chartsPage.tableRows.first().verifyTableRow({
			chartName: 'Chart 1',
			chartCreationDate: '13 Sep 2021',
			chartModificationDate: '13 Sep 2021'
		})
		//Multiple Results
		chartsPage.searchInput.clear().type('chart');
		cy.verifyChartsOrderAndName(
			['Chart 1', 'Chart 2', 'Chart 5' ]
		);
		chartsPage.tableRows.first().verifyTableRow({
			chartName: 'Chart 1',
			chartCreationDate: '13 Sep 2021',
			chartModificationDate: '13 Sep 2021'
		})
		//Clear search
		chartsPage.searchInput.clear();
		cy.verifyChartsOrderAndName(
			['Chart 1', 'Chart 2', 'Chart 5', 'My awesome test 4', 'Test 3']
		);
		chartsPage.tableRows.first().verifyTableRow({
			chartName: 'Chart 1',
			chartCreationDate: '13 Sep 2021',
			chartModificationDate: '13 Sep 2021'
		})
		//One Result
		chartsPage.searchInput.clear().type('chart 5');
		cy.verifyChartsOrderAndName(
			['Chart 5']
		);
		chartsPage.tableRows.first().verifyTableRow({
			chartName: 'Chart 5',
			chartCreationDate: '31 May 2021',
			chartModificationDate: '31 May 2021'
		})
	})

	it('Should verify create chart button destination', () => {
		chartsPage.createChartButton.click();
		cy.url().should('include', '/Page2');
		cy.contains('Go back').click();
		chartsPage.createChartButton.should('be.visible')
	})
});
