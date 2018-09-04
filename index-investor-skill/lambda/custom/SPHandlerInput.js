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
      "sessionId": "amzn1.echo-api.session.d43872ee-a074-4c0f-9dd6-6db2b18f10bc",
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
        "apiAccessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJhdWQiOiJodHRwczovL2FwaS5hbWF6b25hbGV4YS5jb20iLCJpc3MiOiJBbGV4YVNraWxsS2l0Iiwic3ViIjoiYW16bjEuYXNrLnNraWxsLmM5NTA0NjZiLWIyMjgtNDJlZC1iYzQwLTE1YTM3ODdkODIwYiIsImV4cCI6MTUzNTk5MTU1NSwiaWF0IjoxNTM1OTg3OTU1LCJuYmYiOjE1MzU5ODc5NTUsInByaXZhdGVDbGFpbXMiOnsiY29uc2VudFRva2VuIjpudWxsLCJkZXZpY2VJZCI6ImFtem4xLmFzay5kZXZpY2UuQUVRQkRGV1ZDRFo1TjQzQVpMNU5QWkFHVDc0NUpZM1JBREpYWUQ2QlVPNUFJTVdMVE1DSVo1QVJEVEhJSkhOU1RJNlhKWVZGSzZZQTNRSUYzRFBDV0gySjM2U1NDVzRER1VMVEoyWlNLVFRDSVQ2WkQ3TlZLVU5OUFo2TEVEV1hKRUxUQU9FVEw3VU9MSExJWUJORlU0NlVST0hBIiwidXNlcklkIjoiYW16bjEuYXNrLmFjY291bnQuQUYzTUlTTUVTNlI1NkJGSkdFQ1NMQTNPNVVETU9TUVVOTUVCUVY0MzdSVFJKUzNFRTdDNFhPUllYVzVVUjZWTUM2N01EMjRGWkhDR1FNQkE1VkNWWVdOTlpKTTNXQ1RDTkxOV0dNN1k1Rk5SMjNHSVpFU1VXNlQzQlRCWExINlZINVkyTDdEUkpIQ0I2Mk9PSzNYVU1GUlpBV1JRUlAzWldPUkxKTVVZVUo1N0FNU0pKUkRGNFZEQUE3VzdKS1RUSDVWTDJLREhZSE1TWFVZIn19.Y_sI2CA54IOd4XpblAVtdYCel4aek0_2O2Auy9DJ2H8r_oajcRqJOnICvmg3WjOjBofgL9KdVqFt-54L5FV3ozey_hoB_1bOj9ElWmubV3HFkQ7Yrcm0Y-gGVnnk8mb6hSAjVYkMwHGqBz5ITclrhjlKVYqdVUuUVcr_wVhV_6aH-ETK-x70r77FDXcEB3h7c1-h7kkYfkij9K3Cn0TuHdfdrMH-tCdF7du6LibM6YkPk78pB7yfUiaYXYuOqbXam08b2KOM-IdlfvKyvb_TXwDCK4h4m9GANoY3XowUtgbn_zn0AeGQ8Aw66y3wXgFItEh593YQ_lyRwAmKnbzmXA"
      }
    },
    "request": {
      "type": "IntentRequest",
      "requestId": "amzn1.echo-api.request.6a3fe7bc-08e8-48ca-8754-b3639c231ee3",
      "timestamp": "2018-09-03T15:19:15Z",
      "locale": "en-US",
      "intent": {
        "name": "SPIntent",
        "confirmationStatus": "NONE"
      }
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
