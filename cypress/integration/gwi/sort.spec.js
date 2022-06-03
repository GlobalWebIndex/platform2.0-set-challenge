context("UI - Sort Graphs", () => {
  let date = [];
  let names = [];
  let timestamp = null;

  before(() => {
    cy.visit("http://localhost:3000");
  });

  afterEach(() => {
    date = [];
    names = [];
    timestamp = null;
  });

  it("Sort by name", () => {
    cy.get("span").contains("Name").parent("button").click();
    cy.get(
      "[class='MuiGrid-root MuiGrid-container MuiGrid-align-items-xs-center MuiGrid-justify-content-xs-space-between'] [class='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6']"
    ).each(($el) => {
      names.push($el.text());
    });

    names.forEach(function (e) {
      if (timestamp != null) {
        assert.isTrue(e.localeCompare(timestamp) == -1);
      } else {
        timestamp = e;
      }
    });
  });

  it("Sort by creation date", () => {
    cy.get("span").contains("Date created").parent("button").click();
    let text
    for (let i = 0; i < 10; i += 2) {
      if(i == 0){
        cy.get(
        "[class='MuiGrid-root MuiGrid-container MuiGrid-align-items-xs-center MuiGrid-justify-content-xs-space-between'] [class='MuiGrid-root MuiGrid-item']"
      )
        .eq(i)
        .then(function (dateCreated) {
            text = dateCreated.text();
        });
    } else {
        cy.get(
            "[class='MuiGrid-root MuiGrid-container MuiGrid-align-items-xs-center MuiGrid-justify-content-xs-space-between'] [class='MuiGrid-root MuiGrid-item']"
          )
            .eq(i)
            .then(function (dateCreated) {
                assert.isTrue(new Date(text) <= new Date(dateCreated.text()))
                text = dateCreated.text();
            });
    }
    }
  });

  it("Sort by modified date", () => {
    cy.get("span").contains("Last modified").parent("button").click();
    let text
    for (let i = 0; i < 10; i += 2) {
      if(i == 0){
        cy.get(
        "[class='MuiGrid-root MuiGrid-container MuiGrid-align-items-xs-center MuiGrid-justify-content-xs-space-between'] [class='MuiGrid-root MuiGrid-item']"
      )
        .eq(i).next()
        .then(function (dateCreated) {
            text = dateCreated.text();
        });
    } else {
        cy.get(
            "[class='MuiGrid-root MuiGrid-container MuiGrid-align-items-xs-center MuiGrid-justify-content-xs-space-between'] [class='MuiGrid-root MuiGrid-item']"
          )
            .eq(i).next()
            .then(function (dateCreated) {
                assert.isTrue(new Date(text) <= new Date(dateCreated.text())) // There is a product bug on the 4th cell
                text = dateCreated.text();
            });
    }
    }
  });
});
