import { defineConfig } from "cypress";
import * as dotenv from "dotenv";

dotenv.config(); 

export default defineConfig({
  projectId: "4owz8m",
  e2e: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    testIsolation: true,
    setupNodeEvents(on, config) {}
  },
  env: {
    adminUserEmail: process.env.CYPRESS_ADMIN_USER_EMAIL,
    adminUserPass: process.env.CYPRESS_ADMIN_USER_PASSWORD,
    customerUserEmail: process.env.CYPRESS_CUSTOMER_USER_EMAIL,
    customerUserPass: process.env.CYPRESS_CUSTOMER_USER_PASSWORD
  }
})
