describe("HomePage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Check on unchecked checkbox in list to mark complete.", () => {

    cy.contains("To-do List");
    cy.contains("My To-dos");

    //loading
    cy.get("[aria-label='Loading todos']");

    //success
    cy.get("div[role=list]").children().filter(":has(input[type=checkbox]:not(:checked))").first().then(($elem) => {
      cy.wrap($elem).within(() => {
        cy.get("input[type=checkbox]").click();
  
        //loading
        cy.get("span[role=progressbar]");
  
        cy.get("span[role=presentation]").should("exist");
        cy.get("button[aria-label='Delete todo']").should("be.disabled");
  
        //success
        cy.get("span[role=progressbar]").should("not.exist");
        cy.get("span[role=presentation]").should("not.exist");
  
        cy.get("input[type=checkbox]").should("be.checked");
        cy.get("a[aria-label='Edit todo']").should("have.attr", "href");
        cy.get("button[aria-label='Delete todo']").should("not.be.disabled");
      });
  
    });
  });

  it("Deletes a todo item. Shows the modal. Updates the list.", () => {

    cy.contains("To-do List");
    cy.contains("My To-dos");

    //loading
    cy.get("[aria-label='Loading todos']");

    cy.get("div[role=list]").children().its("length").then((len) => {
      const changingLength = len;

      //success
      cy.get("div[role=list]").children().first().within(($first) => {
        cy.wrap($first).as("firstitem");
        cy.get("button[aria-label='Delete todo']").click();
      });

      //Modal
      cy.get("div[role=presentation]").as("deletemodal").should("exist");

      cy.get("@deletemodal").find("button").contains("Yes").click();

      cy.get("@deletemodal").should("not.exist");

      //loading
      cy.get("div[role=list]").children().first().within(() => {
    
        cy.get("span[role=progressbar]");
        cy.get("input[type=checkbox]").should("be.disabled");
        
      });

      //success
      cy.get("@firstitem").should("not.exist");
      cy.get("div[role=list]").children().should("have.length", changingLength - 1);
    });

  });

});