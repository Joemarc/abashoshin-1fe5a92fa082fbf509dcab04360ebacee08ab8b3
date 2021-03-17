const configuration = {
  apiAuthUrl: process.env.REACT_APP_API_AUTH_URL,
  apiUrl: process.env.REACT_APP_API_URL,
  websiteUrl: process.env.REACT_APP_WEBSITE_URL,
  environment: process.env.REACT_APP_ENVIRONMENT,
  isProduction: process.env.REACT_APP_IS_PRODUCTION,
  stripe: {
    stripeApiKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  }
};

export default configuration;
