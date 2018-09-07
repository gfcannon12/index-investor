const index = require('./index.js');

(async () => {
  try {
    const inputFile = require('./LaunchHandlerInput.js');
    const input = inputFile.handlerInput;
    const output = await index.LaunchRequestHandler.handle(input);
    console.log('Test Complete')
  } catch(e) {
    console.error(e);
  }
})();