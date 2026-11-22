import loginElements from '../../elements/login/loginElements'

describe('Login tests', function () {
  before(function () {
    cy.fixture('routes.json').as('routes')
  })

  beforeEach(function () {
    cy.fixture('login-data').as('user')
  })

  describe('Customer login', function () {
    it('Should successfully login to customer page', function () {
      // Arrange
      const customer = { ...this.user.customer }
      const route = { ...this.routes }
      cy.visit(route.loginPage)

      // Act
      cy.login(customer.email, customer.pass)

      // Assert
      cy.validateCurrentUrl(route.customerDashboard)
    })
  })

  describe('Admin login', function () {
    it('Should successfully login to admin page', function () {
      // Arrange
      const admin = { ...this.user.admin }
      const route = { ...this.routes }
      cy.visit(route.loginPage)

      // Act
      cy.login(admin.email, admin.pass)

      // Assert
      cy.validateCurrentUrl(route.adminDashboard)
    })
  })

  describe('Field Validation', function () {
    it('Should return error when no e-mail is typed', function () {
      // Arrange
      const customer = { ...this.user.customerNoEmail }
      const route = { ...this.routes }
      cy.visit(route.loginPage)

      // Act
      cy.login(customer.email, customer.pass)

      // Assert
      cy.validateMessage(loginElements.emailError, 'Email is required')
      cy.validateCurrentUrl(route.loginPage)
    })

    it('Should return error when no password is typed', function () {
      // Arrange
      const customer = { ...this.user.customerNoPass }
      const route = { ...this.routes }
      cy.visit(route.loginPage)

      // Act
      cy.login(customer.email, customer.pass)

      // Assert
      cy.validateMessage(loginElements.passError, 'Password is required')
      cy.validateCurrentUrl(route.loginPage)
    })

    it('Should return error when email format is invalid', function () {
      // Arrange
      const customer = { ...this.user.customerInvalidEmail }
      const route = { ...this.routes }
      cy.visit(route.loginPage)

      // Act
      cy.login(customer.email, customer.pass)

      // Assert
      cy.validateMessage(loginElements.emailError, 'Email format is invalid')
      cy.validateCurrentUrl(route.loginPage)
    })

    it('Should return error when password length is lower than 3', function () {
      // Arrange
      const customer = { ...this.user.customerShortPass }
      const route = { ...this.routes }
      cy.visit(route.loginPage)

      // Act
      cy.login(customer.email, customer.pass)

      // Assert
      cy.validateMessage(loginElements.passError, 'Password length is invalid')
      cy.validateCurrentUrl(route.loginPage)
    })
  })

  describe('UI element validation', function () {
    it('Social login button should be available', function () {
      // Arrange
      const route = { ...this.routes }
      cy.visit(route.loginPage)

      //Act
      // No user action

      // ASsert
      cy.get(loginElements.buttonSocialLogin).should('be.visible')
    })

    it('Register account link should be available', function () {
      // Arrange
      const route = { ...this.routes }
      cy.visit(route.loginPage)

      // Act
      cy.get(loginElements.linkRegister).should('be.visible').click()

      // Assert
      cy.validateCurrentUrl(route.registerPage)
    })

    it('Password recovery link should be available', function () {
      // Arrange
      const route = { ...this.routes }
      cy.visit(route.loginPage)

      // Act
      cy.get(loginElements.linkRecoverPass).should('be.visible').click()

      // Assert
      cy.validateCurrentUrl(route.recoveryPage)
    })
  })
})

describe('Teste', () => {
  it('exemplo', () => {
    cy.wait(5000)
    cy.get('#id').click({ force: true })
  })
})
