/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const queryDB = require('./queryDB.js');
const document = require('./apl_template.json');

async function respond(handlerInput, col, colName, prettyName) {
  try {
    const responseElements  = await queryDB.pullData(col, colName);
    console.log('data retrieved')
    const APLDirective = {
      type : 'Alexa.Presentation.APL.RenderDocument',
      document : document,
      datasources: {
        "displayData": {
          "type": "object",
          "properties": {
            "summary": responseElements.summary,
            "chartURL": `https://s3.amazonaws.com/index-investor/charts/${col}_${responseElements.lastDate}.png`
          }
        }
      }
    }

    let builtResponse;
    if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL'] != undefined) {
      builtResponse = handlerInput.responseBuilder
      .addDirective(APLDirective)
      .speak(responseElements.speechText)
      .withSimpleCard(prettyName, responseElements.cardText)    
      .getResponse()
    } else {
      builtResponse = handlerInput.responseBuilder
      .speak(responseElements.speechText)
      .withSimpleCard(prettyName, responseElements.cardText)    
      .getResponse()
    }
    console.log('Response', builtResponse);
    return builtResponse;;
  } catch(e) {
    console.error(e);
    return;
  }
}

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
    return await respond(handlerInput, 'sp500', 'the S and P 500', 'S&P 500');
  }
}

const DowIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'DowIntent';
  },
  async handle(handlerInput) {
    return await respond(handlerInput, 'djia', 'the dow jones industrial average', 'DOW JONES');
  }
}

const NasdaqIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'NasdaqIntent';
  },
  async handle(handlerInput) {
    return await respond(handlerInput, 'nasdaq', 'the nasdaq', 'NASDAQ');
  }
}

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say "Ask Index Investor how the market is doing."  You can also try "Ask Index Investor for the Dow" or "Ask Index Investor for the Nasdaq."';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Index Investor', speechText)
      .getResponse();
  }
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
  }
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
  }
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    SPIntentHandler,
    DowIntentHandler,
    NasdaqIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

  exports.LaunchRequestHandler = LaunchRequestHandler;
  exports.SPIntentHandler = SPIntentHandler;
  exports.DowIntentHandler = DowIntentHandler;
  exports.NasdaqIntentHandler = NasdaqIntentHandler;
  exports.HelpIntentHandler = HelpIntentHandler;
  exports.CancelAndStopIntentHandler = CancelAndStopIntentHandler;
  exports.SessionEndedRequestHandler = SessionEndedRequestHandler;