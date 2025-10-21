import loginElements from '../elements/login/loginElements'
import registerElements from '../elements/registration/registrationElements'


Cypress.Commands.add('login', (email, password) => {
    cy.get(loginElements.loginForm).should('be.visible')
    
    email
        ? cy.get(loginElements.inputEmail).should('be.visible').clear().type(email)
        : cy.log("E-mail is null")
    password
        ? cy.get(loginElements.inputPassword).should('be.visible').clear().type(password)
        : cy.log("Password is null")
    
    cy.get(loginElements.buttonLogin).should('be.visible').click();    
});

Cypress.Commands.add('register', (user) => {
    cy.visit('/auth/register')
    cy.get(registerElements.registerForm).should('be.visible')
    
    user.firstName
        ? cy.get(registerElements.inputFirstName).should('be.visible').clear().type(user.firstName)
        : cy.log("First name is null")
    user.lastName
        ? cy.get(registerElements.inputLastName).should('be.visible').clear().type(user.lastName)
        : cy.log("Last name is null")
    user.dob
        ? cy.get(registerElements.inputDob).should('be.visible').clear().type(user.dob)
        : cy.log("Date of birth is null")
    user.street
        ? cy.get(registerElements.inputStreet).should('be.visible').clear().type(user.street)
        : cy.log("Street is null")
    user.postalCode
        ? cy.get(registerElements.inputPostalCode).should('be.visible').clear().type(user.postalCode)
        : cy.log("Postal code is null")
    user.city
        ? cy.get(registerElements.inputCity).should('be.visible').clear().type(user.city)
        : cy.log("City is null")
    user.state
        ? cy.get(registerElements.inputState).should('be.visible').clear().type(user.state)
        : cy.log("State is null")
    user.country
        ? cy.get(registerElements.selectCountry).should('be.visible').select(user.country)
        : cy.log("Country is null")
    user.phone
        ? cy.get(registerElements.inputPhone).should('be.visible').clear().type(user.phone)
        : cy.log("Phone is null")
    user.email
        ? cy.get(registerElements.inputEmail).should('be.visible').clear().type(user.email)
        : cy.log("Email is null")
    user.password
        ? cy.get(registerElements.inputPassword).should('be.visible').clear().type(user.password)
        : cy.log("Password is null")

    cy.get(registerElements.buttonRegisterSubmit).should('be.visible').click();    
});

Cypress.Commands.add('validateMessage', (selector, expectedMessage) => {
    cy.get(selector)
    .should('be.visible')
    .and('have.text', expectedMessage)
})

Cypress.Commands.add('validateCurrentUrl', (url) => {
    cy.url()
    .should('contain', url)
})