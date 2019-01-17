/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const queryDB = require('./queryDB.js');
const document = require('./apl_template.json');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    return SPIntentHandler.handle(handlerInput);
  }
}

const SPIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'SPIntent';
  },
  async handle(handlerInput) {
    try {
      const responseElements  = await queryDB.pullData('sp500_close', 'the S and P 500');
      console.log('data retrieved')
      const APLDirective = {
        type : 'Alexa.Presentation.APL.RenderDocument',
        document : document,
        datasources: {
          "displayData": {
            "type": "object",
            "properties": {
              "summary": responseElements.summary,
              "chartURL": `https://s3.amazonaws.com/index-investor/charts/sp500_close_${responseElements.lastDate}.png`
            }
          }
        }
      }

      let builtResponse;
      if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL'] != undefined) {
        builtResponse = handlerInput.responseBuilder
        .addDirective(APLDirective)
        .speak(responseElements.speechText)
        .withSimpleCard('S&P 500', responseElements.cardText)    
        .getResponse()
      } else {
        builtResponse = handlerInput.responseBuilder
        .speak(responseElements.speechText)
        .withSimpleCard('S&P 500', responseElements.cardText)    
        .getResponse()
      }
      console.log('Response', builtResponse);
      return builtResponse;;
    } catch(e) {
      console.error(e);
      return;
    }
  }
}

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'Ask me how the market is doing';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Index Investor', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Index Investor', speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return false;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    SPIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

  exports.LaunchRequestHandler = LaunchRequestHandler;
  exports.SPIntentHandler = SPIntentHandler;
  exports.HelpIntentHandler = HelpIntentHandler;
  exports.CancelAndStopIntentHandler = CancelAndStopIntentHandler;
  exports.SessionEndedRequestHandler = SessionEndedRequestHandler;