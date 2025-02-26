describe("SearchAndFilter", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Filter completed todos.", () => {

        cy.contains("To-do List");
        cy.contains("My To-dos");

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("button").contains("Completed").click();

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("div[role=list]").children().find("input[type=checkbox]").should("be.checked");
    
    });

    it("Filter completed todos. Search in completed. Valid.", () => {

        cy.contains("To-do List");
        cy.contains("My To-dos");

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("button").contains("Completed").click();

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("div[role=list]").children().find("input[type=checkbox]").should("be.checked");

        //search
        cy.get("input[placeholder='Search todos...']").type("Project report");

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("[aria-label='Loading todos']").should("not.exist");

        cy.get("div[role=list]").children().contains(/Project report/i);
    
    });

    it("Filter completed todos. Search in completed. Invalid.", () => {

        cy.contains("To-do List");
        cy.contains("My To-dos");

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("button").contains("Completed").click();

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("div[role=list]").children().find("input[type=checkbox]").should("be.checked");

        //search
        cy.get("input[placeholder='Search todos...']").type("Something random");

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("[aria-label='Loading todos']").should("not.exist");

        cy.get("h2").contains("No Results");
    
    });

    it("Filter pending todos.", () => {

        cy.contains("To-do List");
        cy.contains("My To-dos");

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("button").contains("Pending").click();

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("div[role=list]").children().find("input[type=checkbox]").should("not.be.checked");
        
    });

    it("Filter pending todos. Search in pending. Valid.", () => {

        cy.contains("To-do List");
        cy.contains("My To-dos");

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("button").contains("Pending").click();

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("div[role=list]").children().find("input[type=checkbox]").should("not.be.checked");

        //search
        cy.get("input[placeholder='Search todos...']").type("Doctor's appointment");

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("[aria-label='Loading todos']").should("not.exist");

        cy.get("div[role=list]").children().contains(/Doctor's appointment/i);
        
    });

    it("Filter pending todos. Search in pending. Invalid.", () => {

        cy.contains("To-do List");
        cy.contains("My To-dos");

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("button").contains("Pending").click();

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("div[role=list]").children().find("input[type=checkbox]").should("not.be.checked");

        //search
        cy.get("input[placeholder='Search todos...']").type("Something random");

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("[aria-label='Loading todos']").should("not.exist");

        cy.get("h2").contains("No Results");
        
    });

    it("Filter all todos.", () => {

        cy.contains("To-do List");
        cy.contains("My To-dos");

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("button").contains("All").click();

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("div[role=list]").children().should("have.length.greaterThan", 0);
    
    });

    it("Filter all todos. Search in all. Valid.", () => {

        cy.contains("To-do List");
        cy.contains("My To-dos");

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("button").contains("All").click();

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("div[role=list]").children().should("have.length.greaterThan", 0);

        //search
        cy.get("input[placeholder='Search todos...']").type("Project report");

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("[aria-label='Loading todos']").should("not.exist");

        cy.get("div[role=list]").children().contains(/Project report/i);
    
    });

    it("Filter all todos. Search in all. Invalid.", () => {

        cy.contains("To-do List");
        cy.contains("My To-dos");

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("button").contains("All").click();

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("div[role=list]").children().should("have.length.greaterThan", 0);

        //search
        cy.get("input[placeholder='Search todos...']").type("Something random");

        //loading
        cy.get("[aria-label='Loading todos']");

        //success
        cy.get("[aria-label='Loading todos']").should("not.exist");

        cy.get("h2").contains("No Results");
    
    });

});