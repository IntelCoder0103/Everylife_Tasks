describe("template spec", () => {
  beforeEach(() => {
    cy.intercept("https://adam-deleteme.s3.amazonaws.com/tasks.json", [
      {
        id: 1,
        name: "Make a hot drink",
        description: "Make a cup of tea",
        type: "general",
      },
      {
        id: 2,
        name: "Make a snack",
        description: "Soup, or biscuits or both.",
        type: "nutrition",
      },
    ]);
  });

  it("passes", () => {
    cy.visit("http://localhost:5173");
  });

  it("should display all the tasks based on the search, and display `No Items` when there is no tasks", () => {
    cy.visit("http://localhost:5173");

    cy.get(".task-item").should("have.length", 2);
    cy.contains(/Make a hot drink/);
    cy.contains(/Make a snack/);

    cy.visit("http://localhost:5173?search=snack");

    cy.get(".task-item").should("have.length", 1);
    cy.contains(/Make a hot drink/).should("not.exist");
    cy.contains(/Make a snack/);

    cy.visit("http://localhost:5173?search=abcd");
    cy.get(".task-item").should("have.length", 0);
    cy.contains(/Make a hot drink/).should("not.exist");
    cy.contains(/Make a snack/).should("not.exist");
    cy.contains(/No Items/);
  });

  it("should change the url and filter the results when you type enter on the search", () => {
    cy.visit("http://localhost:5173");
    cy.get("input.task-list__search").type("tea{enter}");
    cy.url().should("contain", "?search=tea");

    cy.contains(/Make a snack/).should("not.exist");
    cy.contains(/Make a hot drink/);
  });

  it("should group the tasks by its type when you toggle on the `Group`", () => {
    cy.visit("http://localhost:5173");
    cy.contains(/Group/).siblings("button").click();
    
    cy.contains(/Make a hot drink/).should('not.exist');
    cy.contains(/GENERAL/).click();
    cy.contains(/Make a hot drink/);

    cy.contains(/NUTRITION/);
    cy.contains(1);

  });

  it("should update the task when you click save button", () => {
    cy.visit("http://localhost:5173");
    cy.contains(/hot drink/).click();
    cy.get("input[name=name]").clear().type("Some name");
    cy.get("textarea[name=description]").clear().type("Some desc");

    cy.contains(/Save/).click();

    cy.contains(/Some name/);
    cy.contains(/Some desc/);
  });

  it("should delete the task when you click delete button and confirm it", () => {
    cy.on("window:confirm", () => true);

    cy.visit("http://localhost:5173");
    cy.contains(/hot drink/).click();
    cy.contains(/Delete/).click();

    cy.get(".task-item").should("have.length", 1);
    cy.contains(/Make a hot drink/).should("not.exist");
    cy.contains(/Make a snack/);
  });
});
