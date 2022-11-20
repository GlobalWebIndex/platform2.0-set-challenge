declare namespace Cypress {
    interface Chainable {
		/**
		 * Custom assert charts order and name
		 */
		verifyChartsOrderAndName(charts: string[]): Chainable<Element>;

		/**
		 * Custom assert charts row
		 */
		verifyTableRow(tableRow: tableRow): Cypress<Subject>;

		/**
		 * Custom assert charts sorted by column
		 */
		verifyChartsSortedBy(column: string, isDate: boolean): Cypress<Subject>;
    }
}
