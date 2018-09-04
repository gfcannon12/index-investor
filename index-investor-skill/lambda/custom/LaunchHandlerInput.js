//const attributesManager = require('./node_modules/ask-sdk-core/dist/attributes/AttributesManagerFactory.js');
const rb = require("./node_modules/ask-sdk-core/dist/response/ResponseFactory.js");
const responseBuilder = rb.ResponseFactory.init();
//const Skill = require("./node_modules/ask-sdk-core/dist/skill/Skill.js");

/*
// From Skill.js to initialize Attributes
attributesManager: AttributesManagerFactory_1.AttributesManagerFactory.init({
  requestEnvelope: requestEnvelope,
  persistenceAdapter: this.persistenceAdapter,
*/

exports.handlerInput = {
  "requestEnvelope": {
    "version": "1.0",
    "session": {
      "new": true,
      "sessionId": "amzn1.echo-api.session.864bff09-4ba5-4573-af90-e7e5dd6da841",
      "application": {
        "applicationId": "amzn1.ask.skill.c950466b-b228-42ed-bc40-15a3787d820b"
      },
      "user": {
        "userId": "amzn1.ask.account.AF3MISMES6R56BFJGECSLA3O5UDMOSQUNMEBQV437RTRJS3EE7C4XORYXW5UR6VMC67MD24FZHCGQMBA5VCVYWNNZJM3WCTCNLNWGM7Y5FNR23GIZESUW6T3BTBXLH6VH5Y2L7DRJHCB62OOK3XUMFRZAWRQRP3ZWORLJMUYUJ57AMSJJRDF4VDAA7W7JKTTH5VL2KDHYHMSXUY"
      }
    },
    "context": {
      "System": {
        "application": {
          "applicationId": "amzn1.ask.skill.c950466b-b228-42ed-bc40-15a3787d820b"
        },
        "user": {
          "userId": "amzn1.ask.account.AF3MISMES6R56BFJGECSLA3O5UDMOSQUNMEBQV437RTRJS3EE7C4XORYXW5UR6VMC67MD24FZHCGQMBA5VCVYWNNZJM3WCTCNLNWGM7Y5FNR23GIZESUW6T3BTBXLH6VH5Y2L7DRJHCB62OOK3XUMFRZAWRQRP3ZWORLJMUYUJ57AMSJJRDF4VDAA7W7JKTTH5VL2KDHYHMSXUY"
        },
        "device": {
          "deviceId": "amzn1.ask.device.AEQBDFWVCDZ5N43AZL5NPZAGT745JY3RADJXYD6BUO5AIMWLTMCIZ5ARDTHIJHNSTI6XJYVFK6YA3QIF3DPCWH2J36SSCW4DGULTJ2ZSKTTCIT6ZD7NVKUNNPZ6LEDWXJELTAOETL7UOLHLIYBNFU46UROHA",
          "supportedInterfaces": {}
        },
        "apiEndpoint": "https://api.amazonalexa.com",
        "apiAccessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJhdWQiOiJodHRwczovL2FwaS5hbWF6b25hbGV4YS5jb20iLCJpc3MiOiJBbGV4YVNraWxsS2l0Iiwic3ViIjoiYW16bjEuYXNrLnNraWxsLmM5NTA0NjZiLWIyMjgtNDJlZC1iYzQwLTE1YTM3ODdkODIwYiIsImV4cCI6MTUzNjAwNTg1MSwiaWF0IjoxNTM2MDAyMjUxLCJuYmYiOjE1MzYwMDIyNTEsInByaXZhdGVDbGFpbXMiOnsiY29uc2VudFRva2VuIjpudWxsLCJkZXZpY2VJZCI6ImFtem4xLmFzay5kZXZpY2UuQUVRQkRGV1ZDRFo1TjQzQVpMNU5QWkFHVDc0NUpZM1JBREpYWUQ2QlVPNUFJTVdMVE1DSVo1QVJEVEhJSkhOU1RJNlhKWVZGSzZZQTNRSUYzRFBDV0gySjM2U1NDVzRER1VMVEoyWlNLVFRDSVQ2WkQ3TlZLVU5OUFo2TEVEV1hKRUxUQU9FVEw3VU9MSExJWUJORlU0NlVST0hBIiwidXNlcklkIjoiYW16bjEuYXNrLmFjY291bnQuQUYzTUlTTUVTNlI1NkJGSkdFQ1NMQTNPNVVETU9TUVVOTUVCUVY0MzdSVFJKUzNFRTdDNFhPUllYVzVVUjZWTUM2N01EMjRGWkhDR1FNQkE1VkNWWVdOTlpKTTNXQ1RDTkxOV0dNN1k1Rk5SMjNHSVpFU1VXNlQzQlRCWExINlZINVkyTDdEUkpIQ0I2Mk9PSzNYVU1GUlpBV1JRUlAzWldPUkxKTVVZVUo1N0FNU0pKUkRGNFZEQUE3VzdKS1RUSDVWTDJLREhZSE1TWFVZIn19.SRjSL29dZ9sFSUQ0puMfKdJeJpQKXfHw5SPiEHrAiDvXO44cjRlcUHbCwX3YZRdI4sRWCRTbQP2P7DH5_dfb6PiX4dhPHVCxLyf0zj3PZ7_5jqN8Xscl5lBEcqY7htlI1Hnxl4VYHfyhmftLzZ-8wEbGEqqnTGhjsGDKfDh06M9o8RB48b1GHo1IMcyT4h41EgLWBkk4mpFXn268IuMDFkasUYNulLL2JaoXxGDIX8lAMZW9vKaRlaQPF-jHD2cvSifIBmvtyVRDGvWypyPDKbwtlqO4Mu7EzJOKuGoRmAKlz33WELKR-safi7ACCHEGFLFrTj7rd6RvirHoKPKltA"
      }
    },
    "request": {
      "type": "LaunchRequest",
      "requestId": "amzn1.echo-api.request.2ca2d323-7679-499f-812c-717fd99ccdb6",
      "timestamp": "2018-09-03T19:17:31Z",
      "locale": "en-US",
      "shouldLinkResultBeReturned": false
    }
  },
  "attributesManager": {},
  /*
  { "getRequestAttributes": attributesManager.getRequestAttributes,
    "getSessionAttributes": attributesManager.getSessionAttributes,
    "getPersistentAttributes": attributesManager.getPersistentAttributes,
    "setRequestAttributes": attributesManager.setRequestAttributes,
    "setSessionAttributes": attributesManager.setSessionAttributes,
    "setPersistentAttributes": attributesManager.setPersistentAttributes,
    "savePersistentAttributes": attributesManager.savePersistentAttributes },*/
 "responseBuilder":
  { "speak": responseBuilder.speak,
    "reprompt": responseBuilder.reprompt,
    "withSimpleCard": responseBuilder.withSimpleCard,
    "withStandardCard": responseBuilder.withStandardCard,
    "withLinkAccountCard": responseBuilder.withLinkAccountCard,
    "withAskForPermissionsConsentCard": responseBuilder.withAskForPermissionsConsentCard,
    "addDelegateDirective": responseBuilder.addDelegateDirective,
    "addElicitSlotDirective": responseBuilder.addElicitSlotDirective,
    "addConfirmSlotDirective": responseBuilder.addConfirmSlotDirective,
    "addConfirmIntentDirective": responseBuilder.addConfirmIntentDirective,
    "addAudioPlayerPlayDirectiv": responseBuilder.addAudioPlayerPlayDirective,
    "addAudioPlayerStopDirective": responseBuilder.addAudioPlayerStopDirective,
    "addAudioPlayerClearQueueDirective": responseBuilder.addAudioPlayerClearQueueDirective,
    "addRenderTemplateDirective": responseBuilder.addRenderTemplateDirective,
    "addHintDirective": responseBuilder.addHintDirective,
    "addVideoAppLaunchDirective": responseBuilder.addVideoAppLaunchDirective,
    "withShouldEndSession": responseBuilder.withShouldEndSession,
    "addDirective": responseBuilder.addDirective,
    "getResponse": responseBuilder.getResponse },
 "serviceClientFactory": undefined
}
