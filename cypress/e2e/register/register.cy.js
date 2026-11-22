describe('Registration tests', () => {
  before(function () {
    cy.fixture('routes.json').as('routes')
  })

  beforeEach(function () {
    cy.fixture('registration-data').as('user')
  })

  describe('Successful registration', () => {
    it.only('Should successfully register a new customer', function () {
      const user = { ...this.user.validUser }

      cy.register(user)
    })

    it('Should successfully register a second customer', function () {})
  })
})
