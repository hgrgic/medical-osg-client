import cognito from '../auth/cognitoFunctions';

export const CLEAR_SESSION = 'CLEAR_SESSION'
export const SET_SESSION = 'SET_SESSION'
export const clearSession = () => ({
  type: CLEAR_SESSION
})

// Initialise the Cognito sesson from a callback href
export function initSessionFromCallbackURI (callbackHref) {
  return function (dispatch) {
    return cognito.parseCognitoWebResponse(callbackHref) // parse the callback URL
      .then(() => cognito.getCognitoSession()) // get a new session
      .then((session) => {
        dispatch({ type: SET_SESSION, session })
      })
  }
}

export const setSession = session => ({
  type: SET_SESSION,
  session
})