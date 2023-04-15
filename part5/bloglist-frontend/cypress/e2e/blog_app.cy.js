describe("bloglist app", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "tester",
      username: "tester",
      password: "tester",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("frontpage opened", () => {
    cy.contains("username");
  });

  it("log in", function () {
    cy.get("input:first").type("tester");
    cy.get("input:last").type("tester");
    cy.contains("login").click();
    cy.contains("blog");
  });

  it("login fail", function () {
    cy.get("input:first").type("fail");
    cy.get("input:last").type("fail");
    cy.contains("login").click();
    cy.get(".error")
      .should("contain", "wrong credentials")
      .and("have.css", "border-style", "solid")
      .and("have.css", "color", "rgb(255, 0, 0)");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.get("input:first").type("tester");
      cy.get("input:last").type("tester");
      cy.contains("login").click();
    });

    it("a new blog created", function () {
      cy.contains("new blog").click();
      cy.get("#Title").type("x");
      cy.get("#Author").type("y");
      cy.get("#url").type("z");
      cy.contains("Submit").click();
      cy.get(".added").should("contain", "x by y has been added");
    });

    describe("when blog is there", function () {
      beforeEach(function () {
        cy.contains("new blog").click();
        cy.get("#Title").type("x");
        cy.get("#Author").type("y");
        cy.get("#url").type("z");
        cy.contains("Submit").click();
        cy.get(".added").should("contain", "x by y has been added");
      });

      it("like blog", function () {
        cy.contains("View").click();
        cy.contains("0");
        cy.contains("like").click();
        cy.contains("1");
      });

      it("delete blog", function () {
        cy.contains("View").click();
        cy.contains("delete").click();
        cy.wait(6000);
        cy.contains("x").should("not.exist");
      });

      it("ordered by likes", function () {
        cy.contains("new blog").click();
        cy.get("#Title").type("x1");
        cy.get("#Author").type("y1");
        cy.get("#url").type("z1");
        cy.contains("Submit").click();
        cy.contains("View").click();
        cy.contains("0");
        cy.contains("like").click();
        cy.contains("1");

        cy.get(".blog").eq(0).should("contain", "x");
        cy.get(".blog").eq(1).should("contain", "x1");
      });
    });
  });
});
