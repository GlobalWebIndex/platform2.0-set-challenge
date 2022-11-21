import '@testing-library/cypress/add-commands'
import ChartsPage from '../pages/ChartsPage';

Cypress.Commands.add('verifyChartsOrderAndName', (charts: string[]) => {
	Cypress.log({
		name: `verifyChartsOrderAndName: ${charts}`,
	});
	const chartsPage = new ChartsPage()
	charts.forEach((chartName, index) => {
		chartsPage.tableRows
			.should('have.length', charts.length)
			.eq(index)
			.findByTestId('chartName')
			.should('have.text', chartName);
	});
});

Cypress.Commands.add('verifyChartsSortedBy', {prevSubject: 'element'}, (subject, column, isDate) => {
	Cypress.log({
		name: 'verifyChartsSortedBy',
		message: `verifyChartsSortedBy ${column}`
	});
	cy.wrap(subject)
		.should('have.length.above', 0)
		.then(items => {
			const elements = items.map((index, element) =>
				Cypress.$(element).find('[data-testid="'+column+'"]').text()).get();
			const unsortedItems =
				isDate ?
				elements
				.map((str) => new Date(str))
				.map((d) => d.getTime())
					: elements
			const sortedItems = Cypress._.sortBy(unsortedItems);
			assert.deepEqual(unsortedItems, sortedItems);
		});
});

Cypress.Commands.add('verifyTableRow', {prevSubject: 'element'}, (subject, tableRow) => {
	Cypress.log({
		name: 'getTableRow',
		message: 'getTableRow'
	});
	cy.wrap(subject)
		.findByTestId('chartName')
		.should('have.text', tableRow.chartName)
	cy.wrap(subject)
		.findByTestId('chartCreated')
		.should('have.text', tableRow.chartCreationDate)
	cy.wrap(subject)
		.findByTestId('chartLastMod')
		.should('have.text', tableRow.chartModificationDate)
});
