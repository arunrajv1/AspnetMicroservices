export const msalConfig = {
    auth: {
      clientId: "8c19b93a-61cb-4f9c-bd83-2071181cbced",
     // authority: "https://login.microsoftonline.com/8ad8aee2-71d0-4bd8-8fcd-1bc3fd1195d2", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
     authority:"https://sunquestazuredev.b2clogin.com/sunquestazuredev.onmicrosoft.com/B2C_1_Signin_SignUp_Invictus/v2.0/", 
     redirectUri: "https://nextgenap-invictus-patientwebapp.azurewebsites.net",
     knownAuthorities: ['sunquestazuredev.b2clogin.com'],
     authorityMetadata: '{"issuer": "https://sunquestazuredev.b2clogin.com/8ad8aee2-71d0-4bd8-8fcd-1bc3fd1195d2/v2.0/","authorization_endpoint": "https://sunquestazuredev.b2clogin.com/sunquestazuredev.onmicrosoft.com/B2C_1_Signin_SignUp_Invictus/oauth2/v2.0/authorize","token_endpoint": "https://sunquestazuredev.b2clogin.com/sunquestazuredev.onmicrosoft.com/B2C_1_Signin_SignUp_Invictus/oauth2/v2.0/token", "end_session_endpoint": "https://sunquestazuredev.b2clogin.com/sunquestazuredev.onmicrosoft.com/B2C_1_Signin_SignUp_Invictus/oauth2/v2.0/logout","jwks_uri": "https://sunquestazuredev.b2clogin.com/sunquestazuredev.onmicrosoft.com/B2C_1_Signin_SignUp_Invictus/discovery/v2.0/keys","response_modes_supported": ["query","fragment","form_post"],"response_types_supported": ["code","code id_token","code token","code id_token token","id_token","id_token token","token","token id_token"],"scopes_supported": ["openid"],"subject_types_supported": ["pairwise"],"id_token_signing_alg_values_supported": ["RS256"],"token_endpoint_auth_methods_supported": ["client_secret_post","client_secret_basic"],"claims_supported": ["name","emails","given_name","idp","family_name","newUser","oid","sub","extension_VueRoleName","tfp","isForgotPassword","iss","iat","exp","aud","acr","nonce","auth_time"]}'
    },
    cache: {
      cacheLocation: "localStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
   scopes: ["OpenID","offline_access","https://sunquestazuredev.onmicrosoft.com/263a3ac8-0e2e-490f-8189-7105945a5fb8/FullAccess"]
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "Enter_the_Graph_Endpoint_Here/v1.0/me"
  };