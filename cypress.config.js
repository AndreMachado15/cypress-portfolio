import { defineConfig } from 'cypress'
import * as dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  projectId: '4owz8m',
  e2e: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    testIsolation: true,
    setupNodeEvents(on, config) {},
  },
  env: {},
})
