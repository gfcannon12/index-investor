const index = require('./index.js');

try {
  let inputFile = require('./LaunchHandlerInput.js');
  let input = inputFile.handlerInput;
  index.LaunchRequestHandler.handle(input);
  console.log('Test Complete')
} catch(e) {
  console.error(e);
}