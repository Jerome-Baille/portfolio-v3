const emailURL = 'http://localhost:3000/api/email/jerome-portfolio';
const portfolioURL = 'http://localhost:3000/api';

export const environment = {
  production: false,
  emailURL,
  portfolioURL,
  aboutURL: `${portfolioURL}/about`,
  projectURL: `${portfolioURL}/projects`
};