const users = require("../fixtures/users");

describe("Sauce Demo - Authentication Test Suite ", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
  });

  it(" SC1 - Valid username and password", () => {
    cy.get('[data-test="username"]').type(users[0].username);
    cy.get('[data-test="password"]').type(users[0].password);
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "inventory");
    cy.get(".inventory_item").should("have.length", 6).and("be.visible");
  });

  it("SC2 - Valid username and invalid password", () => {
    cy.get("[data-test=username]").type(users[1].username);
    cy.get("[data-test=password]").type(users[1].password);
    cy.get("[data-test=login-button]").click();

    cy.get("[data-test=error]")
      .should("be.visible")
      .and("include.text", "Username and password do not match any user");
  });

  it("SC3 - Invalid username and valid password", () => {
    cy.get("[data-test=username]").type(users[2].username);
    cy.get("[data-test=password]").type(users[2].password);
    cy.get("[data-test=login-button]").click();

    cy.get("[data-test=error]")
      .should("be.visible")
      .and("include.text", "Username and password do not match any user");
  });

  it("SC4 - Locked out user", () => {
    cy.get("[data-test=username]").type(users[3].username);
    cy.get("[data-test=password]").type(users[3].password);
    cy.get("[data-test=login-button]").click();

    cy.get("[data-test=error]")
      .should("be.visible")
      .and("include.text", "this user has been locked out");
  });
});
