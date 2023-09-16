// TEST CASES:
// 1. verify the filters in Orders Overview Page [DONE]
// 2  Reset the filter for each filter validation [DONE]
// 3. Verify the rows in each filter [DONE]
// 4. Hide and unhide the column [PENDING]
// 5. Combination of different filter selection [PENDING]
// 6.  [PENDING]

beforeEach(() => {
  cy.login({
    email: "acceptance-test+oms@boxture.com",
    password: "xudrah-zygJa2-topbib",
  });
});

describe("Validation of filters in Order Overview", () => {
  it("Account Filter", () => {
    cy.visit("/orders");
    cy.url().should("include", "/orders");
    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });
    //3 dots should be visible and clickable
    cy.get('[data-column="account"] [data-icon="ellipsis"]')
      .should("be.visible")
      .click();
    //Account searchable field should be visible
    cy.get(
      '[data-column="account"] [data-satis-dropdown-target="searchInput"]'
    ).should("be.visible");
    //cross button should be visible
    cy.get(
      '[data-column="account"] [data-satis-dropdown-target="resetButton"]'
    ).should("be.visible");
    //drop down button should be visible
    cy.get(
      '[data-column="account"] [data-satis-dropdown-target="toggleButton"]'
    ).should("be.visible");
    //click drop down button should see all the dropdown values

    cy.get(
      '[data-column="account"] [data-satis-dropdown-target="toggleButton"]'
    ).click();
    // cy.conta
    //validate each rows
    cy.get('[data-column="account"]').find("li").should("have.length", "5");

    cy.get('[data-column="account"]')
      .find("li")
      .contains("Filter values")
      .should("be.visible");
    cy.get('[data-column="account"]')
      .find("li")
      .contains("Sort ascending")
      .should("be.visible");
    cy.get('[data-column="account"]')
      .find("li")
      .contains("Sort descending")
      .should("be.visible");
    cy.get('[data-column="account"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");
  });
  it("ID Filter", () => {
    cy.visit("/orders");
    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();
    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });

    cy.get('[data-column="id"]')
      .find('[type="button"]')
      .should("be.visible")
      .click();

    //validate each rows
    cy.get('[data-column="id"]').find("li").should("have.length", "5");

    cy.get('[data-column="id"]')
      .find("li")
      .contains("Filter values")
      .should("be.visible");
    cy.get('[data-column="id"]')
      .find("li")
      .contains("Sort ascending")
      .should("be.visible");
    cy.get('[data-column="id"]')
      .find("li")
      .contains("Sort descending")
      .should("be.visible");
    cy.get('[data-column="id"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");
    //validation of input search column
    cy.get('[data-column="id"]')
      .find('[data-action="change->act-table#__perform"]')
      .should("be.visible")
      .clear()
      .type("03312027");
    cy.get("body").click();
    cy.wait(2000);
    cy.get("tr.cursor-pointer td:nth-child(5)").then((e1) => {
      let status = e1.text();
      expect(status).to.equal("cancelled");
    });
  });
  it("TYPE Filter", () => {
    cy.visit("/orders");
    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });
    cy.get('[data-column="type"] [data-icon="ellipsis"]')

      .should("be.visible")
      .click();
    cy.get("ul")
      .find('[data-satis-dropdown-target="searchInput"]')
      .should("be.visible");
    cy.get('[data-column="type"]').find("li").should("have.length", "3");
    cy.get('[data-column="type"]')
      .find("li")
      .contains("Filter values")
      .should("be.visible");

    cy.get('[data-column="type"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");
    //validation of input search column
    cy.get('[data-column="type"] [data-satis-dropdown-target="searchInput"]')
      .should("be.visible")
      .clear()
      .type("sales");
    cy.contains('[title*="index.orders"]', "Orders").click();
    cy.get("tr:nth-child(2) td:nth-child(4)").should(
      "have.text",
      "Sales order"
    );
    cy.get("tr:nth-child(3) td:nth-child(4)").should(
      "have.text",
      "Sales order"
    );
    cy.get("tr:nth-child(4) td:nth-child(4)").should(
      "have.text",
      "Sales order"
    );
    cy.get("tr:nth-child(5) td:nth-child(4)").should(
      "have.text",
      "Sales order"
    );
  });
  it("STATE Filter", () => {
    cy.visit("/orders");
    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });
    cy.get('[data-column="state"] [data-icon="ellipsis"] ')

      .should("be.visible")
      .click();

    cy.get("ul")
      .find('[data-satis-dropdown-target="searchInput"]')
      .should("be.visible");

    //validate each rows
    cy.get('[data-column="state"]').find("li").should("have.length", "5");

    cy.get('[data-column="state"]')
      .find("li")
      .contains("Filter values")
      .should("be.visible");
    cy.get('[data-column="state"]')
      .find("li")
      .contains("Sort ascending")
      .should("be.visible");
    cy.get('[data-column="state"]')
      .find("li")
      .contains("Sort descending")
      .should("be.visible");
    cy.get('[data-column="state"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");

    //validation of input search column
    cy.get('[data-column="state"] [data-satis-dropdown-target="searchInput"]')
      .should("be.visible")
      .clear()
      .type("proce");
    cy.contains('[title*="index.orders"]', "Orders").click();
    cy.get("tr:nth-child(2) td:nth-child(5)").should("have.text", "processing");
    cy.get("tr:nth-child(3) td:nth-child(5)").should("have.text", "processing");
    cy.get("tr:nth-child(4) td:nth-child(5)").should("have.text", "processing");
    cy.get("tr:nth-child(5) td:nth-child(5)").should("have.text", "processing");
  });
  it.skip("Channel Filter", () => {
    cy.visit("/orders");
    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.wrap($e1).contains("Reset view").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });
    cy.get('[data-column="channel"] [data-icon="ellipsis"] ')

      .should("be.visible")
      .click();

    cy.get("ul")
      .find('[data-satis-dropdown-target="searchInput"]')
      .should("be.visible");

    //validate each rows
    cy.get('[data-column="channel"]').find("li").should("have.length", "5");

    cy.get('[data-column="channel"]')
      .find("li")
      .contains("Filter values")
      .should("be.visible");
    cy.get('[data-column="channel"]')
      .find("li")
      .contains("Sort ascending")
      .should("be.visible");
    cy.get('[data-column="channel"]')
      .find("li")
      .contains("Sort descending")
      .should("be.visible");
    cy.get('[data-column="channel"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");
    //validation of input search column
    cy.get(
      '[data-column="channel"] [data-satis-dropdown-target="searchInput"]',
      { timeout: 3000 }
    )
      .should("be.visible")
      .clear()
      .type("ebay");
    cy.get("tr:nth-child(2) td:nth-child(6)").should("have.text", "eBay");
    cy.get("tr:nth-child(2) td:nth-child(6)").should("have.text", "eBay");
    cy.get("tr:nth-child(2) td:nth-child(6)").should("have.text", "eBay");
    cy.get("tr:nth-child(2) td:nth-child(6)").should("have.text", "eBay");

    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();
    cy.contains("Reset view").click();
    cy.contains(".translation_missing", "Orders").click();

    // if (cy.contains("Reset view").length > 0){
    //   cy.contains("Reset view").click();
    // } else {
    //   cy.contains('[title*="index.orders"]', "Orders").click();
    // }
  });
  it("Business Model Filter", () => {
    cy.visit("/orders");

    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });

    cy.get('[data-column="business_model"] [data-icon="ellipsis"] ')

      .should("be.visible")
      .click();

    cy.get("ul")
      .find('[data-satis-dropdown-target="searchInput"]')
      .should("be.visible");

    //validate each rows
    cy.get('[data-column="business_model"]')
      .find("li")
      .should("have.length", "5");

    cy.get('[data-column="business_model"]')
      .find("li")
      .contains("Filter values")
      .should("be.visible");
    cy.get('[data-column="business_model"]')
      .find("li")
      .contains("Sort ascending")
      .should("be.visible");
    cy.get('[data-column="business_model"]')
      .find("li")
      .contains("Sort descending")
      .should("be.visible");
    cy.get('[data-column="business_model"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");
    //validation of input search column
    cy.get(
      '[data-column="business_model"] [data-satis-dropdown-target="searchInput"]'
    )
      .should("be.visible")
      .clear()
      .type("Business to consumer");
    cy.wait(2000);
    cy.get("tr:nth-child(2) td:nth-child(7)").should(
      "have.text",
      "Business to consumer"
    );
    cy.get("tr:nth-child(2) td:nth-child(7)").should(
      "have.text",
      "Business to consumer"
    );
    cy.get("tr:nth-child(2) td:nth-child(7)").should(
      "have.text",
      "Business to consumer"
    );
    cy.get("tr:nth-child(2) td:nth-child(7)").should(
      "have.text",
      "Business to consumer"
    );

    // }
  });
  it("Ship At Filter", () => {
    cy.visit("/orders");

    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });

    cy.get('[data-column="ship_at"] [data-icon="ellipsis"] ')

      .should("be.visible")
      .click();

    cy.get(
      '[data-column="ship_at"] [data-satis-date-time-picker-target="input"]'
    ).should("be.visible");

    //validate each rows
    cy.get('[data-column="ship_at"]').find("li").should("have.length", "5");

    cy.get('[data-column="ship_at"]')
      .find("li")
      .contains("Filter values")
      .should("be.visible");
    cy.get('[data-column="ship_at"]')
      .find("li")
      .contains("Sort ascending")
      .should("be.visible");
    cy.get('[data-column="ship_at"]')
      .find("li")
      .contains("Sort descending")
      .should("be.visible");
    cy.get('[data-column="ship_at"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");
    //validation of input search column
    cy.get(
      '[data-column="ship_at"] [data-satis-date-time-picker-target="input"]'
    )
      .should("be.visible")
      .click();
    // cy.get(".grid-cols-7 div")
    //   .eq(0)
    //   .then((e1) => {
    //     cy.log(e1.text());
    //   });

    cy.contains(".block", "1").click();
    cy.contains(".block", "20").click();
    cy.get("tr:nth-child(1) td:nth-child(8)")
      .should("be.visible")
      .should("not.be.empty");
    cy.get("tr:nth-child(2) td:nth-child(8)")
      .should("be.visible")
      .should("not.be.empty");
    cy.get("tr:nth-child(3) td:nth-child(8)")
      .should("be.visible")
      .should("not.be.empty");
    // }
  });
  it("Customer Reference Number Filter", () => {
    cy.visit("/orders");

    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });

    cy.get('[data-column="customer_reference_number"] [data-icon="ellipsis"]')
      .scrollIntoView()
      .should("be.visible")
      .click();

    cy.get("ul")
      .find('[data-filter="customer_reference_number"]')
      .should("be.visible");

    //validate each rows
    cy.get('[data-column="customer_reference_number"]')
      .find("li")
      .should("have.length", "5");

    cy.get('[data-column="customer_reference_number"]')
      .find("li")
      .contains("Filter values")
      .should("be.visible");
    cy.get('[data-column="customer_reference_number"]')
      .find("li")
      .contains("Sort ascending")
      .should("be.visible");
    cy.get('[data-column="customer_reference_number"]')
      .find("li")
      .contains("Sort descending")
      .should("be.visible");
    cy.get('[data-column="customer_reference_number"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");
    //validation of input search column
    cy.get(
      '[data-column="customer_reference_number"] [data-filter="customer_reference_number"]'
    )
      .should("be.visible")
      .clear()
      .type("3745873465");
    cy.contains('[title*="index.orders"]', "Orders").click();
    cy.get("tr:nth-child(1) td:nth-child(9)").should("have.text", "3745873465");
    // }
  });

  it("Purchase Order Number Filter", () => {
    cy.visit("/orders");

    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });

    cy.get('[data-column="purchase_order_number"] [data-icon="ellipsis"] ')
      .scrollIntoView()
      .should("be.visible")
      .click();

    //validate each rows
    cy.get('[data-column="purchase_order_number"]')
      .find("li")
      .should("have.length", "3");

    cy.get('[data-column="purchase_order_number"]')
      .find("li")
      .contains("Sort ascending")
      .should("be.visible");
    cy.get('[data-column="purchase_order_number"]')
      .find("li")
      .contains("Sort descending")
      .should("be.visible");
    cy.get('[data-column="purchase_order_number"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");

    // }
  });
  it("Expected Filter", () => {
    cy.visit("/orders");

    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });

    cy.get('[data-column="expected"] [data-icon="ellipsis"] ')
      .scrollIntoView()
      .should("be.visible")
      .click();

    //validate each rows
    cy.get('[data-column="expected"]').find("li").should("have.length", "3");

    cy.get('[data-column="expected"]')
      .find("li")
      .contains("Sort ascending")
      .should("be.visible");
    cy.get('[data-column="expected"]')
      .find("li")
      .contains("Sort descending")
      .should("be.visible");
    cy.get('[data-column="expected"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");

    // }
  });
  it("Pending Filter", () => {
    cy.visit("/orders");

    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });

    cy.get('[data-column="pending"] [data-icon="ellipsis"] ')
      .scrollIntoView()
      .should("be.visible")
      .click();

    //validate each rows
    cy.get('[data-column="pending"]').find("li").should("have.length", "3");

    cy.get('[data-column="pending"]')
      .find("li")
      .contains("Sort ascending")
      .should("be.visible");
    cy.get('[data-column="pending"]')
      .find("li")
      .contains("Sort descending")
      .should("be.visible");
    cy.get('[data-column="pending"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");

    // }
  });
  it("Received Filter", () => {
    cy.visit("/orders");

    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });

    cy.get('[data-column="received"] [data-icon="ellipsis"] ')
      .scrollIntoView()
      .should("be.visible")
      .click();

    //validate each rows
    cy.get('[data-column="received"]').find("li").should("have.length", "3");

    cy.get('[data-column="received"]')
      .find("li")
      .contains("Sort ascending")
      .should("be.visible");
    cy.get('[data-column="received"]')
      .find("li")
      .contains("Sort descending")
      .should("be.visible");
    cy.get('[data-column="received"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");

    // }
  });
  it("Backordered Filter", () => {
    cy.visit("/orders");

    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });

    cy.get('[data-column="backordered"] [data-icon="ellipsis"] ')
      .scrollIntoView()
      .should("be.visible")
      .click();

    //validate each rows
    cy.get('[data-column="backordered"]').find("li").should("have.length", "3");

    cy.get('[data-column="backordered"]')
      .find("li")
      .contains("Sort ascending")
      .should("be.visible");
    cy.get('[data-column="backordered"]')
      .find("li")
      .contains("Sort descending")
      .should("be.visible");
    cy.get('[data-column="backordered"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");

    // }
  });
  it("Allocated Filter", () => {
    cy.visit("/orders");

    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });

    cy.get('[data-column="allocated"] [data-icon="ellipsis"] ')
      .scrollIntoView()
      .should("be.visible")
      .click();

    //validate each rows
    cy.get('[data-column="allocated"]').find("li").should("have.length", "3");

    cy.get('[data-column="allocated"]')
      .find("li")
      .contains("Sort ascending")
      .should("be.visible");
    cy.get('[data-column="allocated"]')
      .find("li")
      .contains("Sort descending")
      .should("be.visible");
    cy.get('[data-column="allocated"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");

    // }
  });
  it("Picking Filter", () => {
    cy.visit("/orders");

    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });

    cy.get('[data-column="picking"] [data-icon="ellipsis"] ')
      .scrollIntoView()
      .should("be.visible")
      .click();

    //validate each rows
    cy.get('[data-column="picking"]').find("li").should("have.length", "3");

    cy.get('[data-column="picking"]')
      .find("li")
      .contains("Sort ascending")
      .should("be.visible");
    cy.get('[data-column="picking"]')
      .find("li")
      .contains("Sort descending")
      .should("be.visible");
    cy.get('[data-column="picking"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");

    // }
  });
  it("Picked Filter", () => {
    cy.visit("/orders");

    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });

    cy.get('[data-column="picked"] [data-icon="ellipsis"] ')
      .scrollIntoView()
      .should("be.visible")
      .click();

    //validate each rows
    cy.get('[data-column="picked"]').find("li").should("have.length", "3");

    cy.get('[data-column="picked"]')
      .find("li")
      .contains("Sort ascending")
      .should("be.visible");
    cy.get('[data-column="picked"]')
      .find("li")
      .contains("Sort descending")
      .should("be.visible");
    cy.get('[data-column="picked"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");

    // }
  });
  it("Packed Filter", () => {
    cy.visit("/orders");

    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });

    cy.get('[data-column="packed"] [data-icon="ellipsis"] ')
      .scrollIntoView()
      .should("be.visible")
      .click();

    //validate each rows
    cy.get('[data-column="packed"]').find("li").should("have.length", "3");

    cy.get('[data-column="packed"]')
      .find("li")
      .contains("Sort ascending")
      .should("be.visible");
    cy.get('[data-column="packed"]')
      .find("li")
      .contains("Sort descending")
      .should("be.visible");
    cy.get('[data-column="packed"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");

    // }
  });
  it("Shipped Filter", () => {
    cy.visit("/orders");

    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });

    cy.get('[data-column="shipped"] [data-icon="ellipsis"] ')
      .scrollIntoView()
      .should("be.visible")
      .click();

    //validate each rows
    cy.get('[data-column="shipped"]').find("li").should("have.length", "3");

    cy.get('[data-column="shipped"]')
      .find("li")
      .contains("Sort ascending")
      .should("be.visible");
    cy.get('[data-column="shipped"]')
      .find("li")
      .contains("Sort descending")
      .should("be.visible");
    cy.get('[data-column="shipped"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");

    // }
  });
  it("Hold Filter", () => {
    cy.visit("/orders");

    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });

    cy.get('[data-column="hold"] [data-icon="ellipsis"] ')
      .scrollIntoView()
      .should("be.visible")
      .click();

    //validate each rows
    cy.get('[data-column="hold"]').find("li").should("have.length", "3");

    cy.get('[data-column="hold"]')
      .find("li")
      .contains("Sort ascending")
      .should("be.visible");
    cy.get('[data-column="hold"]')
      .find("li")
      .contains("Sort descending")
      .should("be.visible");
    cy.get('[data-column="hold"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");

    // }
  });
  it("Cancelled Filter", () => {
    cy.visit("/orders");

    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });

    cy.get('[data-column="cancelled"] [data-icon="ellipsis"] ')
      .scrollIntoView()
      .should("be.visible")
      .click();

    //validate each rows
    cy.get('[data-column="cancelled"]').find("li").should("have.length", "3");

    cy.get('[data-column="cancelled"]')
      .find("li")
      .contains("Sort ascending")
      .should("be.visible");
    cy.get('[data-column="cancelled"]')
      .find("li")
      .contains("Sort descending")
      .should("be.visible");
    cy.get('[data-column="cancelled"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");

    // }
  });

  it("Customer Filter", () => {
    cy.visit("/orders");

    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });

    cy.get('[data-column="customer"] [data-icon="ellipsis"] ')
      .scrollIntoView()
      .should("be.visible")
      .click();

    cy.get('[data-filter="customer"]').should("be.visible");

    //validate each rows
    cy.get('[data-column="customer"]').find("li").should("have.length", "3");

    cy.get('[data-column="customer"]')
      .find("li")
      .contains("Filter values")
      .should("be.visible");

    cy.get('[data-column="customer"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");
    //validation of input search column
    cy.get('[data-column="customer"] [data-filter="customer"]')
      .should("be.visible")
      .clear()
      .type("Boxture");
    cy.contains('[title*="index.orders"]', "Orders").click();
    cy.get("tr:nth-child(2) td:nth-child(22)").should(
      "have.text",
      "Boxture BV"
    );
    cy.get("tr:nth-child(3) td:nth-child(22)").should(
      "have.text",
      "Boxture BV"
    );
    cy.get("tr:nth-child(4) td:nth-child(22)").should(
      "have.text",
      "Boxture BV"
    );
    cy.get("tr:nth-child(5) td:nth-child(22)").should(
      "have.text",
      "Boxture BV"
    );

    // }
  });
  it("Vendor Filter", () => {
    cy.visit("/orders");

    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });

    cy.get('[data-column="vendor"] [data-icon="ellipsis"] ')
      .scrollIntoView()
      .should("be.visible")
      .click();

    //validate each rows
    cy.get('[data-column="vendor"]').find("li").should("have.length", "1");

    cy.get('[data-column="vendor"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");

    // }
  });
  it.skip("Origin Locations Filter", () => {
    cy.visit("/orders");

    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });

    cy.get('[data-column="origin_locations"] [data-icon="ellipsis"] ')
      .scrollIntoView()
      .should("be.visible")
      .click();

    //validate each rows
    cy.get('[data-column="origin_locations"]')
      .find("li")
      .should("have.length", "3");

    cy.get('[data-column="origin_locations"]')
      .find("li")
      .contains("Filter values")
      .should("be.visible");

    cy.get('[data-column="origin_locations"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");
    //validation of input search column
    cy.get('[placeholder="Origin locations"]')
      .scrollIntoView()
      .should("be.visible")
      .clear()
      .type("btx-alm-new");
    cy.contains('[title*="index.orders"]', "Orders").click();
    cy.get("tr:nth-child(1) td:nth-child(24)").should(
      "have.text",
      "BTX-ALM-NEW"
    );
    cy.get("tr:nth-child(2) td:nth-child(24)").should(
      "have.text",
      "BTX-ALM-NEW"
    );
    cy.get("tr:nth-child(3) td:nth-child(24)").should(
      "have.text",
      "BTX-ALM-NEW"
    );
    cy.get("tr:nth-child(4) td:nth-child(24)").should(
      "have.text",
      "BTX-ALM-NEW"
    );

    // }
  });
  it.skip("Destination Locations Filter", () => {
    cy.visit("/orders");

    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });

    cy.get('[data-column="destination_location"] [data-icon="ellipsis"] ')
      .scrollIntoView()
      .should("be.visible")
      .click();

    //validate each rows
    cy.get('[data-column="destination_location"]')
      .find("li")
      .should("have.length", "3");

    cy.get('[data-column="destination_location"]')
      .find("li")
      .contains("Filter values")
      .should("be.visible");

    cy.get('[data-column="destination_location"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");
    //validation of input search column
    cy.get('[placeholder="Destination location"]')
      .scrollIntoView()
      .should("be.visible")
      .clear()
      .type("btx-alm-new");
    cy.contains('[title*="index.orders"]', "Orders").click();
    cy.get("tr:nth-child(1) td:nth-child(25)").should(
      "have.text",
      "BTX-ALM-NEW"
    );
    cy.get("tr:nth-child(2) td:nth-child(25)").should(
      "have.text",
      "BTX-ALM-NEW"
    );
    cy.get("tr:nth-child(3) td:nth-child(25)").should(
      "have.text",
      "BTX-ALM-NEW"
    );
    cy.get("tr:nth-child(4) td:nth-child(25)").should(
      "have.text",
      "BTX-ALM-NEW"
    );

    // }
  });
  it("Created At Filter", () => {
    cy.visit("/orders");

    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });

    cy.get('[data-column="created_at"] [data-icon="ellipsis"] ')
      .scrollIntoView()

      .should("be.visible")
      .click();

    cy.get(
      '[data-column="created_at"] [data-satis-date-time-picker-target="input"]'
    ).should("be.visible");

    //validate each rows
    cy.get('[data-column="created_at"]').find("li").should("have.length", "5");

    cy.get('[data-column="created_at"]')
      .find("li")
      .contains("Filter values")
      .should("be.visible");
    cy.get('[data-column="created_at"]')
      .find("li")
      .contains("Sort ascending")
      .should("be.visible");
    cy.get('[data-column="created_at"]')
      .find("li")
      .contains("Sort descending")
      .should("be.visible");
    cy.get('[data-column="created_at"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");
    //validation of input search column
    cy.get(
      '[data-column="created_at"] [data-satis-date-time-picker-target="input"]'
    )
      .should("be.visible")
      .click();
    // cy.get(".grid-cols-7 div")
    //   .eq(0)
    //   .then((e1) => {
    //     cy.log(e1.text());
    //   });
    cy.contains("[data-column='created_at'] .grid-cols-7 .block", "1").click();
    cy.contains("[data-column='created_at'] .grid-cols-7 .block", "20").click();
    cy.get("tr:nth-child(1) td:nth-child(26)")
      .should("be.visible")
      .should("not.be.empty");
    cy.get("tr:nth-child(2) td:nth-child(26)")
      .should("be.visible")
      .should("not.be.empty");
    cy.get("tr:nth-child(3) td:nth-child(26)")
      .should("be.visible")
      .should("not.be.empty");
    // }
  });
  it("Received At Filter", () => {
    cy.visit("/orders");

    cy.get('[data-action="click->satis-menu#show mouseleave->satis-menu#hide"]')
      .first()
      .click();

    cy.get('[data-satis-menu-submenu-placement="bottom"] li').then(($e1) => {
      const text = $e1.text();
      if (text.includes("Reset view")) {
        cy.contains("Reset view").click();
        cy.contains(".translation_missing", "Orders").click();
      } else {
        cy.contains('[title*="index.orders"]', "Orders").click();
      }
    });

    cy.get('[data-column="received_at"] [data-icon="ellipsis"] ')
      .scrollIntoView()
      .should("be.visible")
      .click();

    cy.get(
      '[data-column="received_at"] [data-satis-date-time-picker-target="input"]'
    ).should("be.visible");

    //validate each rows
    cy.get('[data-column="received_at"]').find("li").should("have.length", "5");

    cy.get('[data-column="received_at"]')
      .find("li")
      .contains("Filter values")
      .should("be.visible");
    cy.get('[data-column="received_at"]')
      .find("li")
      .contains("Sort ascending")
      .should("be.visible");
    cy.get('[data-column="received_at"]')
      .find("li")
      .contains("Sort descending")
      .should("be.visible");
    cy.get('[data-column="received_at"]')
      .find("li")
      .contains("Hide column")
      .should("be.visible");
    //validation of input search column
    cy.get(
      '[data-column="received_at"] [data-satis-date-time-picker-target="input"]'
    )
      .should("be.visible")
      .click();
    // cy.get(".grid-cols-7 div")
    //   .eq(0)
    //   .then((e1) => {
    //     cy.log(e1.text());
    //   });

    cy.contains("[data-column='received_at'] .grid-cols-7 .block", "1").click();
    cy.contains(
      "[data-column='received_at'] .grid-cols-7 .block",
      "20"
    ).click();
    cy.get("tr:nth-child(1) td:nth-child(27)")
      .should("be.visible")
      .should("not.be.empty");
    cy.get("tr:nth-child(2) td:nth-child(27)")
      .should("be.visible")
      .should("not.be.empty");
    cy.get("tr:nth-child(3) td:nth-child(27)")
      .should("be.visible")
      .should("not.be.empty");
    // }
  });
});
