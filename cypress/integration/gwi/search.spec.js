context('UI - Search Graphs', () => {
    before(() => {
      cy.visit('http://localhost:3000')
    })
    
    it('Search for specific chart', () => {
    cy.get("[placeholder='Search charts']").type('Chart')
    cy.get("[class='MuiGrid-root MuiGrid-container MuiGrid-align-items-xs-center MuiGrid-justify-content-xs-space-between'] [class='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6']")
      .first()
      .should('have.text', "Chart 1")
    cy.get("[class='MuiGrid-root MuiGrid-container MuiGrid-align-items-xs-center MuiGrid-justify-content-xs-space-between'] [class='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6']")
      .last()
      .should('have.text', "Chart 5")
    })

    it('Clear search', () => {
      cy.get("[placeholder='Search charts']").clear()
      cy.get("[class='MuiGrid-root MuiGrid-container MuiGrid-align-items-xs-center MuiGrid-justify-content-xs-space-between'] [class='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6']")
        .last()
        .should('have.text', "Test 3")
      })
})