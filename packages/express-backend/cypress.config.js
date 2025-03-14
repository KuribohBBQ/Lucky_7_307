import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: "fc3tam",
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: false,
  },
});
