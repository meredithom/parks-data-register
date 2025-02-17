(function (window) {
  window.__env = window.__env || {};

  window.__env.logLevel = 0; // All

  // Get config from remote host?
  window.__env.configEndpoint = false;

  // Environment name
  window.__env.ENVIRONMENT = "local"; // local | dev | test | prod

  window.__env.API_LOCATION = "http://localhost:3000";
  window.__env.API_PATH = "/api";
  window.__env.KEYCLOAK_CLIENT_ID = "data-register";
  window.__env.KEYCLOAK_URL = "https://dev.loginproxy.gov.bc.ca/auth";
  window.__env.KEYCLOAK_REALM = "bcparks-service-transformation";
  window.__env.KEYCLOAK_ENABLED = true;
  window.__env.REDIRECT_KEY = "redirectToOnLogin";

  // Add any feature-toggles
  // window.__env.coolFeatureActive = false;
})(this);
