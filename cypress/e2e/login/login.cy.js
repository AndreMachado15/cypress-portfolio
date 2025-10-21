import loginElements from '../../elements/login/loginElements';

describe('Login tests', function () {
  before(function () {
    cy.fixture('routes.json').as('routes');
  });

  beforeEach(function () {
    cy.fixture('login-data').as('user');
  });

  describe('Customer login', function() {
    it('Should successfully login to customer page', function () {
      const customer = { ...this.user.customer }
      const route = { ...this.routes }
      cy.visit(route.loginPage)

      cy.login(customer.email, customer.pass)

      cy.validateCurrentUrl(route.customerDashboard)
    });
  });

  describe('Admin login', function() {
    it('Should successfully login to admin page', function () {
      const admin = { ...this.user.admin };
      const route = { ...this.routes };
      cy.visit(route.loginPage)

      cy.login(admin.email, admin.pass);

      cy.validateCurrentUrl(route.adminDashboard);
    });
  });

  describe('Field Validation', function() {
    it('Should return error when no e-mail is typed', function() {
      const customer = { ...this.user.customer, email: null };
      const route = { ...this.routes };
      cy.visit(route.loginPage)

      cy.login(customer.email, customer.pass);

      cy.validateMessage(loginElements.emailError, 'Email is required');
      cy.validateCurrentUrl(route.loginPage);
    });

    it('Should return error when no password is typed', function() {
      const customer = { ...this.user.customer, pass: null };
      const route = { ...this.routes };
      cy.visit(route.loginPage)

      cy.login(customer.email, customer.pass);

      cy.validateMessage(loginElements.passError, 'Password is required');
      cy.validateCurrentUrl(route.loginPage);
    });

    it('Should return error when email format is invalid', function() {
      const customer = { ...this.user.customer, email: "email@" };
      const route = { ...this.routes };
      cy.visit(route.loginPage)

      cy.login(customer.email, customer.pass);

      cy.validateMessage(loginElements.emailError, 'Email format is invalid');
      cy.validateCurrentUrl(route.loginPage);
    });

    it('Should return error when password length is lower than 3', function() {
      const customer = { ...this.user.customer, pass: "ab" };
      const route = { ...this.routes };
      cy.visit(route.loginPage)

      cy.login(customer.email, customer.pass);

      cy.validateMessage(loginElements.passError, 'Password length is invalid');
      cy.validateCurrentUrl(route.loginPage);
    });
  });

  describe('UI element validation', function() {
    it('Social login button should be available', function() {
      const route = { ...this.routes };
      cy.visit(route.loginPage);

      cy.get(loginElements.buttonSocialLogin).should('be.visible');
    });

    it('Register account link should be available', function() {
      const route = { ...this.routes };
      cy.visit(route.loginPage);

      cy.get(loginElements.linkRegister)
        .should('be.visible')
        .click();

      cy.validateCurrentUrl(route.registerPage);
    });

    it('Password recovery link should be available', function() {
      const route = { ...this.routes };
      cy.visit(route.loginPage);

      cy.get(loginElements.linkRecoverPass)
        .should('be.visible')
        .click();

      cy.validateCurrentUrl(route.recoveryPage);
    });
  });
});
