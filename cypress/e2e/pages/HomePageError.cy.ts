import { http, HttpResponse, delay } from "msw";

describe("HomePage", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("Check on unchecked checkbox in list to mark complete. Error.", () => {
  
      cy.contains("To-do List");
      cy.contains("My To-dos");
  
      //loading
      cy.get("[aria-label='Loading todos']");
  
      //success
      cy.get("div[role=list]").children().filter(":has(input[type=checkbox]:not(:checked))").first().then(($elem) => {
        cy.wrap($elem).within(() => {
            //fake request
            cy.interceptMSW(
                http.patch("/api/todolist/:todoId", async () => {
                    await delay();
                    
                    return HttpResponse.error();
                })
            );

            cy.get("input[type=checkbox]").click();
        
            //loading
            cy.get("span[role=progressbar]");
        
            cy.get("span[role=presentation]").should("exist");
            cy.get("button[aria-label='Delete todo']").should("be.disabled");
        
            //error
            cy.get("span[role=progressbar]").should("not.exist");
            cy.get("span[role=presentation]").should("not.exist");
        
            cy.get("input[type=checkbox]").should("not.be.checked");

            cy.get("a[aria-label='Edit todo']").should("have.attr", "href");
            cy.get("button[aria-label='Delete todo']").should("not.be.disabled");


            cy.get("div[role=alert]").as("alert").contains("Something went wrong. Please try again later.");

            //close alert
            cy.get("button[aria-label='Close item alert']").click();

            cy.get("@alert").should("not.exist");
        });
    
      });
    });

    it("Check on unchecked checkbox in list to mark complete. Error. Item not found.", () => {
  
      cy.contains("To-do List");
      cy.contains("My To-dos");
  
      //loading
      cy.get("[aria-label='Loading todos']");
  
      //success
      cy.get("div[role=list]").children().filter(":has(input[type=checkbox]:not(:checked))").first().then(($elem) => {
        cy.wrap($elem).within(() => {
            //fake request
            cy.interceptMSW(
                http.patch("/api/todolist/:todoId", async () => {
                    await delay();
                    
                    return HttpResponse.json({ error: true, message: "Item not found." }, { status: 404 });
                })
            );

            cy.get("input[type=checkbox]").click();
        
            //loading
            cy.get("span[role=progressbar]");
        
            cy.get("span[role=presentation]").should("exist");
            cy.get("button[aria-label='Delete todo']").should("be.disabled");
        
            //error
            cy.get("span[role=progressbar]").should("not.exist");
            cy.get("span[role=presentation]").should("not.exist");
        
            cy.get("input[type=checkbox]").should("not.be.checked");

            cy.get("a[aria-label='Edit todo']").should("have.attr", "href");
            cy.get("button[aria-label='Delete todo']").should("not.be.disabled");


            cy.get("div[role=alert]").as("alert").contains("Item not found.");

            //close alert
            cy.get("button[aria-label='Close item alert']").click();

            cy.get("@alert").should("not.exist");
        });
    
      });
    });
  
    it("Deletes a todo item. Shows the modal. Error.", () => {
  
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

        //fake request
        cy.interceptMSW(
            http.delete("/api/todolist/:todoId", async () => {
                await delay();
                
                return HttpResponse.error();
            })
        );
  
        //Modal
        cy.get("div[role=presentation]").as("deletemodal").should("exist");
  
        cy.get("@deletemodal").find("button").contains("Yes").click();
  
        cy.get("@deletemodal").should("not.exist");
  
        //loading
        cy.get("div[role=list]").children().first().within(() => {
      
          cy.get("span[role=progressbar]");
          cy.get("input[type=checkbox]").should("be.disabled");
          
        });
  
        //error
        cy.get("@firstitem").should("exist");
        cy.get("div[role=list]").children().should("have.length", changingLength);

        cy.get("div[role=alert]").as("alert").contains("Something went wrong. Please try again later.");

        //close alert
        cy.get("button[aria-label='Close item alert']").click();

        cy.get("@alert").should("not.exist");
      });
  
    });

    it("Deletes a todo item. Shows the modal. Error. Item not found.", () => {
  
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

        //fake request
        cy.interceptMSW(
            http.delete("/api/todolist/:todoId", async () => {
                await delay();
                
                return HttpResponse.json({ error: true, message: "Item not found." }, { status: 404 });
            })
        );
  
        //Modal
        cy.get("div[role=presentation]").as("deletemodal").should("exist");
  
        cy.get("@deletemodal").find("button").contains("Yes").click();
  
        cy.get("@deletemodal").should("not.exist");
  
        //loading
        cy.get("div[role=list]").children().first().within(() => {
      
          cy.get("span[role=progressbar]");
          cy.get("input[type=checkbox]").should("be.disabled");
          
        });
  
        //error
        cy.get("@firstitem").should("exist");
        cy.get("div[role=list]").children().should("have.length", changingLength);

        cy.get("div[role=alert]").as("alert").contains("Item not found.");

        //close alert
        cy.get("button[aria-label='Close item alert']").click();

        cy.get("@alert").should("not.exist");
      });
  
    });
  
  });