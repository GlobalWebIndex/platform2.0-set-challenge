context("API Testing on Graphs", () => {
  var date = [];
  var names = [];
  let timestamp = null;

  before(() => {
    cy.visit("http://localhost:3000");
  });

  afterEach(() => {
    date = [];
    names = [];
    timestamp = null;
  });

  it("Get graphs by date created on ascending order", () => {
    cy.request({
      method: "GET",
      url: "/api/charts", // baseUrl is prepend to URL
      qs: {
        orderBy: "dateCreated",
        order: "asc",
      },
    }).as("getGraphs");
    cy.get("@getGraphs").then((todos) => {
      expect(todos.status).to.eq(200);

      todos.body.charts.forEach(function (e) {
        date.push(e.created_at);
        if (timestamp != null) {
          assert.isTrue(new Date(e.created_at) > new Date(timestamp));
        } else {
          timestamp = e.created_at;
        }
      });
    });
  });

  it("Get graphs by date modified on descending order", () => {
    cy.request({
      method: "GET",
      url: "/api/charts", // baseUrl is prepend to URL
      qs: {
        orderBy: "dateCreated",
        order: "desc",
      },
    }).as("getGraphs");
    cy.get("@getGraphs").then((todos) => {
      expect(todos.status).to.eq(200);

      todos.body.charts.forEach(function (e) {
        date.push(e.created_at);
        if (timestamp != null) {
          assert.isTrue(new Date(e.created_at) > new Date(timestamp));
        } else {
          timestamp = e.created_at;
        }
      });
    });
  });

  it("Get graphs by date modified ascending order", () => {
    cy.request({
      method: "GET",
      url: "/api/charts", // baseUrl is prepend to URL
      qs: {
        orderBy: "dateModified",
        order: "asc",
      },
    }).as("getGraphs");
    cy.get("@getGraphs").then((todos) => {
      expect(todos.status).to.eq(200);
      todos.body.charts.forEach(function (e) {
        date.push(e.created_at);
        if (timestamp != null) {
          assert.isTrue(new Date(e.modified_at) > new Date(timestamp));
        } else {
          timestamp = e.modified_at;
        }
      });
    });
  });

  it("Get graphs by date modified descending order", () => {
    cy.request({
      method: "GET",
      url: "/api/charts", // baseUrl is prepend to URL
      qs: {
        orderBy: "dateModified",
        order: "desc",
      },
    }).as("getGraphs");
    cy.get("@getGraphs").then((todos) => {
      expect(todos.status).to.eq(200);
      todos.body.charts.forEach(function (e) {
        date.push(e.created_at);
        if (timestamp != null) {
          assert.isTrue(new Date(e.modified_at) < new Date(timestamp));
        } else {
          timestamp = e.modified_at;
        }
      });
    });
  });

    it("Get graphs by name ascending order", () => {
      cy.request({
        method: "GET",
        url: "/api/charts", // baseUrl is prepend to URL
        qs: {
          orderBy: "name",
          order: "asc"
        },
      }).as("getGraphs");
      cy.get("@getGraphs").then((todos) => {
        expect(todos.status).to.eq(200);
        todos.body.charts.forEach(function (e) {
          names.push(e.name);
          if (timestamp != null) {
            assert.isTrue(e.name.localeCompare(timestamp) == 1);
          } else {
            timestamp = e.name;
          }
        });
      });
    });

    it("Get graphs by name descending order", () => {
        cy.request({
          method: "GET",
          url: "/api/charts", // baseUrl is prepend to URL
          qs: {
            orderBy: "name",
            order: "desc"
          },
        }).as("getGraphs");
        cy.get("@getGraphs").then((todos) => {
          expect(todos.status).to.eq(200);
          todos.body.charts.forEach(function (e) {
            names.push(e.name);
            if (timestamp != null) {
              assert.isTrue(e.name.localeCompare(timestamp) == -1);
            } else {
              timestamp = e.name;
            }
          });
        });
      });

    it("Test 404 Response", () => {
      cy.request({
        method: "GET",
        url: "/api/chartsIn", // baseUrl is prepend to URL
        qs: {
          order: "desc",
        },
        failOnStatusCode: false,
      }).as("getGraphs");
      cy.get("@getGraphs").then((todos) => {
        expect(todos.status).to.eq(404);
      });
    });
});
