const configuration = {
  apiAuthUrl: 'http://localhost:5000/auth',
  apiUrl: "http://localhost:5000",
  websiteUrl: 'http://localhost:5000',
  environment: process.env.REACT_APP_ENVIRONMENT,
  isProduction: process.env.REACT_APP_IS_PRODUCTION,
};

export default configuration;
