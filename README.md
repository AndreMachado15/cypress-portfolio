# Cypress Portfolio

End-to-end test automation project built with [Cypress](https://www.cypress.io/), covering the authentication flows of the [Practice Software Testing](https://practicesoftwaretesting.com/) demo store (Toolshop).

The goal of this repository is to showcase test automation practices: readable test structure, reusable custom commands, centralized selectors and data-driven tests using fixtures.

## Tech stack

- [Cypress](https://www.cypress.io/) 15
- JavaScript (ES modules)
- [dotenv](https://github.com/motdotla/dotenv) for environment configuration

## Project structure

```
cypress-portfolio/
├── cypress/
│   ├── e2e/                    # Test specs
│   │   ├── login/
│   │   │   └── login.cy.js
│   │   └── register/
│   │       └── register.cy.js
│   ├── elements/               # Page selectors, grouped by page
│   │   ├── login/
│   │   │   └── loginElements.js
│   │   └── registration/
│   │       └── registrationElements.js
│   ├── fixtures/               # Test data and application routes
│   │   ├── login-data.json
│   │   ├── registration-data.json
│   │   └── routes.json
│   └── support/
│       ├── commands.js         # Custom Cypress commands
│       └── e2e.js              # Global support file
├── cypress.config.js
└── package.json
```

## Design approach

- **Elements layer** – selectors live in `cypress/elements/`, one object per page, so a UI change only needs to be fixed in one place. `data-test` attributes are preferred whenever the application provides them.
- **Custom commands** – common flows are wrapped in commands in `cypress/support/commands.js`:
  | Command | Description |
  | --- | --- |
  | `cy.login(email, password)` | Fills and submits the login form. `null` values skip the field, which enables required-field tests. |
  | `cy.register(user)` | Opens the registration page and fills every field from a user object. `null` values are skipped. |
  | `cy.validateMessage(selector, text)` | Asserts that an element is visible and has the exact text. |
  | `cy.validateCurrentUrl(path)` | Asserts that the current URL contains the given path. |
- **Data-driven tests** – user data and routes are kept in `cypress/fixtures/`, so new scenarios can be added by creating a new fixture entry.
- **Arrange / Act / Assert** – each test is split into these three explicit steps for readability.
- **Test isolation** – `testIsolation` is enabled, so every test starts from a clean browser state.

## Test coverage

### Login (`login.cy.js`)

| Area | Scenario |
| --- | --- |
| Customer login | Successful login redirects to `/account` |
| Admin login | Successful login redirects to `/admin/dashboard` |
| Field validation | Empty e-mail shows "Email is required" |
| Field validation | Empty password shows "Password is required" |
| Field validation | Invalid e-mail format shows "Email format is invalid" |
| Field validation | Password shorter than 3 characters shows "Password length is invalid" |
| UI elements | Google social login button is visible |
| UI elements | "Register" link navigates to the registration page |
| UI elements | "Forgot password" link navigates to the recovery page |

### Registration (`register.cy.js`) — work in progress

- Successful registration of a new customer.
- Fixtures for negative scenarios are already available in `registration-data.json` (empty fields, invalid date of birth, phone, e-mail and several password rules) and will be turned into tests next.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or later
- npm

### Installation

```bash
git clone <repository-url>
cd cypress-portfolio
npm install
```

### Configuration

The base URL is read from the `BASE_URL` environment variable and falls back to `http://localhost:3000`. Create a `.env` file in the project root:

```env
BASE_URL=https://practicesoftwaretesting.com
```

> The `.env` file is ignored by Git. Never commit real credentials or secrets.

### Running the tests

Open the interactive Cypress runner:

```bash
npx cypress open
```

Run all specs headless:

```bash
npx cypress run
```

Run a single spec:

```bash
npx cypress run --spec cypress/e2e/login/login.cy.js
```

## Test data

The credentials in `login-data.json` are the public demo accounts published by Practice Software Testing. All registration data is fictitious.

## Roadmap

- [ ] Finish the registration suite and cover the negative scenarios
- [ ] Add npm scripts for `cy:open` / `cy:run`
- [ ] Add reporting (e.g. Mochawesome)
- [ ] Run tests in CI (GitHub Actions)
