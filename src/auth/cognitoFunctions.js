import { CognitoAuth } from 'amazon-cognito-auth-js/dist/amazon-cognito-auth'
import { config as AWSConfig } from 'aws-sdk'
import appConfig from '../aws-config/aws-cognito.json';

AWSConfig.region = appConfig.region

// Create a CognitoAuth instance
const createCognitoAuth = () => {
  const appWebDomain = appConfig.userPoolBaseUri.replace('https://', '').replace('http://', '')
  const auth = new CognitoAuth({
    UserPoolId: appConfig.userPool,
    ClientId: appConfig.clientId,
    AppWebDomain: appWebDomain,
    TokenScopesArray: appConfig.tokenScopes,
    RedirectUriSignIn: appConfig.callbackUri,
    RedirectUriSignOut: appConfig.signoutUri
  })
  return auth
}

// Get the URI of the hosted sign in screen
const getCognitoSignInUri = () => {
  const signinUri = `${appConfig.userPoolBaseUri}/login?response_type=code&client_id=${appConfig.clientId}&redirect_uri=${appConfig.callbackUri}`
  return signinUri
}

// Get the URI of the hosted sign up screen
const getCognitoSignUpUri = () => {
  const signupUri = `${appConfig.userPoolBaseUri}/signup?response_type=code&client_id=${appConfig.clientId}&redirect_uri=${appConfig.callbackUri}`
  return signupUri
}

// Parse the response from a Cognito callback URI and return a promise
const parseCognitoWebResponse = (href) => {
  return new Promise((resolve, reject) => {
    const auth = createCognitoAuth()
   
    auth.userHandler = {
      onSuccess: function (result) {
        console.log('success ', result)
        resolve(result)
      },
      onFailure: function (err) {
        console.log('fail  ', err)
        reject(new Error('Failed parsing Cognito web response: ' + err))
      }
    }
    auth.parseCognitoWebResponse(href)
  })
}

// Sign out of the current session (will redirect to signout URI)
const signOutCognitoSession = () => {
  const auth = createCognitoAuth()
  auth.signOut()
}

export default {
  createCognitoAuth,
  getCognitoSignInUri,
  getCognitoSignUpUri,
  parseCognitoWebResponse,
  signOutCognitoSession
}