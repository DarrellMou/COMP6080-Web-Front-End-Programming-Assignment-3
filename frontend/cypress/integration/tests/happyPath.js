context('Signup flow - happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000');
  })

  it('first path', () => {
    const name = 'John Smith';
    const email = 'johnsmith@example.com';
    const password = 'password123';

    cy.contains('Register').click();
    cy.get('input[name=email]').focus().type(email);
    cy.get('input[name=name]').focus().type(name);
    cy.get('input[name=password]').focus().type(password);
    cy.get('input[name=confirmPassword]').focus().type(password);
    cy.contains('Sign up').click();
    
    cy.contains('Your Listings').click();
    cy.contains('Create').click();

    cy.get('[id^=formGridTitle]').focus().type('Listing Test');
    cy.get('[id^=formGridAddress]').focus().type('1234 Main St');
    cy.get('[id^=formGridCity]').focus().type('Sydney');
    cy.get('[id^=formGridState]').focus().type('NSW');
    cy.get('[id^=formGridZip]').focus().type('2000');
    cy.get('[id^=formGridCountry]').focus().type('Australia');
    cy.get('[id^=formGridPrice]').focus().type('1000');
    cy.get('[id^=formGridPropertyType]').focus().type('house');
    cy.get('[id^=formGridNumOfBathrooms]').focus().type('2');
    cy.get('[id^=formGridNumOfBedrooms]').focus().type('4');
    cy.get('[id^=formGridNumOfBeds]').focus().type('4');
    cy.get('[id^=floatingTextarea]').focus().type('BEST HOUSING!!');

    const fixtureFile1 = 'Test1.jpg';
    cy.get('[data-cy="file-input-thumbnail"]').attachFile(fixtureFile1);

    const fixtureFile2 = ['Test1.jpg', 'Test2.jpg', 'Test3.jpg', 'Test4.png', 'Test5.jpg'];
    cy.get('[data-cy="file-input-images"]').attachFile(fixtureFile2);

    cy.contains('Create').click();
    cy.contains('Edit').click();

    const fixtureFile3 = 'Test2.jpg';
    cy.get('[data-cy="file-input-thumbnail"]').attachFile(fixtureFile3);
    cy.get('[id^=formGridTitle]').focus().type("Listing Test Edited");
    cy.contains('Confirm').click();

    cy.contains('Publish').click();
    cy.get('[id=start-date]').focus().type('2021-12-07');
    cy.get('[id=end-date]').focus().type('2021-12-30');
    cy.get('button').contains('Publish').click();
    cy.wait(5000);

    cy.contains('Unpublish').click();

    cy.contains('Publish').click();
    cy.get('[id=start-date]').focus().type('2021-12-07');
    cy.get('[id=end-date]').focus().type('2021-12-30');
    cy.get('button').contains('Publish').click();
    cy.wait(5000);

    cy.contains('Logout').click();

    const name2 = 'Darrell';
    const email2 = 'darrell@example.com';
    const password2 = 'password123';

    cy.contains('Register').click();
    cy.get('input[name=email]').focus().type(email2);
    cy.get('input[name=name]').focus().type(name2);
    cy.get('input[name=password]').focus().type(password2);
    cy.get('input[name=confirmPassword]').focus().type(password2);
    cy.contains('Sign up').click();

    cy.get('[class=card]').click();
    cy.contains('Make Bookings').click();
    cy.get('[id=start-date]').focus().type('2021-12-08');
    cy.get('[id=end-date]').focus().type('2021-12-29');
    cy.wait(2000);
    cy.contains('Check Price').click();
    cy.contains('Confirm Booking').click();

    cy.contains('Logout').click();
    cy.contains('Login').click();
    cy.get('input[name="Email"]').focus().type(email2);
    cy.get('input[name="Password"]').focus().type(password2);
    cy.contains('Log in').click();

    cy.contains('Logout').click();
  })

  it('second path', () => {
    const name = 'John Smith';
    const email = 'johnsmith@example.com';
    const password = 'password123';

    cy.contains('Login').click();
    cy.get('input[name="Email"]').focus().type(email);
    cy.get('input[name="Password"]').focus().type(password);
    cy.contains('Log in').click();
    cy.contains('Your Listings').click();

    cy.intercept('/listings').as('getYourListings');
    for (let i = 1; i < 3; i++) {
      cy.contains('Create').click();

      cy.get('[id^=formGridTitle]').focus().type(`Listing Test${i}`);
      cy.get('[id^=formGridAddress]').focus().type(`${i} Main St`);
      cy.get('[id^=formGridCity]').focus().type('Sydney');
      cy.get('[id^=formGridState]').focus().type('NSW');
      cy.get('[id^=formGridZip]').focus().type('2000');
      cy.get('[id^=formGridCountry]').focus().type('Australia');
      cy.get('[id^=formGridPrice]').focus().type(`100${i}`);
      cy.get('[id^=formGridPropertyType]').focus().type('house');
      cy.get('[id^=formGridNumOfBathrooms]').focus().type('2');
      cy.get('[id^=formGridNumOfBedrooms]').focus().type('4');
      cy.get('[id^=formGridNumOfBeds]').focus().type('4');
      cy.get('[id^=floatingTextarea]').focus().type('BEST HOUSING!!');

      const fixtureFile1 = `Test${i}.jpg`;
        
      cy.get('[data-cy="file-input-thumbnail"]').attachFile(fixtureFile1);

      const fixtureFile2 = ['Test1.jpg', 'Test2.jpg'];
      cy.get('[data-cy="file-input-images"]').attachFile(fixtureFile2);

      cy.contains('Create').click();            
      cy.wait('@getYourListings').then(() => {
        cy.contains(`${i} Main St`, {timeout: 20000}).parent().contains('Publish').click();
        cy.contains('Publish').click();
        cy.get('[id=start-date]').focus().type('2021-12-07');
        cy.get('[id=end-date]').focus().type('2021-12-30');
        cy.get('button').contains('Publish').click();
        cy.wait(5000);
      });
    }
    cy.contains('Logout').click();

    const name2 = 'Darrell';
    const email2 = 'darrell@example.com';
    const password2 = 'password123';

    cy.contains('Login').click();
    cy.get('input[name="Email"]').focus().type(email2);
    cy.get('input[name="Password"]').focus().type(password2);
    cy.contains('Log in').click();

    cy.wait(10000);
    cy.contains('Search Filters', {timeout: 20000}).click();
    cy.get('[id^=formSearch]').focus().type(`Test1`);
    cy.get('[id^=search-button]').click();


  })
})