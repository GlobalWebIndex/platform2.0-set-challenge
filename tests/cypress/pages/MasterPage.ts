class MasterPage {
    protected _url = '/';

    get url() {
        return this._url;
    }

    open(url = this._url) {
        cy.visit(url);
        cy.url().should('include', url);
        return this;
    }
}

export default MasterPage;
