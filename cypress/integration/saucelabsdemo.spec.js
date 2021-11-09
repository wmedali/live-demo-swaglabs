describe("Sauce Demo - Authentication Test Suite ", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
  });

  it(" SC1 - Valid username and password", () => {
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "inventory");
    cy.get(".inventory_item").should("have.length", 6).and("be.visible");
  });

  it("SC2 - Valid username and invalid password", () => {
    cy.get("[data-test=username]").type("standard_user");
    cy.get("[data-test=password]").type("secret_s");
    cy.get("[data-test=login-button]").click();

    cy.get("[data-test=error]")
      .should("be.visible")
      .and("include.text", "Username and password do not match any user");
  });

  it("SC3 - Invalid username and valid password", () => {
    cy.get("[data-test=username]").type("standard_u");
    cy.get("[data-test=password]").type("secret_sauce");
    cy.get("[data-test=login-button]").click();

    cy.get("[data-test=error]")
      .should("be.visible")
      .and("include.text", "Username and password do not match any user");
  });

  it("SC4 - Locked out user", () => {
    cy.get("[data-test=username]").type("locked_out_user");
    cy.get("[data-test=password]").type("secret_sauce");
    cy.get("[data-test=login-button]").click();

    cy.get("[data-test=error]")
      .should("be.visible")
      .and("include.text", "this user has been locked out");
  });
});
