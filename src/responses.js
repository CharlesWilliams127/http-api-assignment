const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const respond = (request, response, content, type, code) => {
  response.writeHead(code, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  const message = {
    message: 'This is a successful response',
  };

  console.dir(acceptedTypes[0]);

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>This is a successful response</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml', 200);
  }

  const messageString = JSON.stringify(message);

  return respond(request, response, messageString, 'application/json', 200);
};

const badRequest = (request, response, acceptedTypes) => {
  const message = {
    message: 'Missing valid query parameter set to true',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>Missing valid query parameter set to true</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml', 400);
  }

  const messageString = JSON.stringify(message);

  return respond(request, response, messageString, 'application/json', 400);
};

const unauthorized = (request, response, acceptedTypes) => {
  const message = {
    message: 'Missing loggedIn query parameter set to yes',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>Missing loggedIn query parameter set to yes</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml', 401);
  }

  const messageString = JSON.stringify(message);

  return respond(request, response, messageString, 'application/json', 401);
};

const forbidden = (request, response, acceptedTypes) => {
  const message = {
    message: 'You do not have access to this content',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>You do not have access to this content</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml', 403);
  }

  const messageString = JSON.stringify(message);

  return respond(request, response, messageString, 'application/json', 403);
};

const internalError = (request, response, acceptedTypes) => {
  const message = {
    message: 'Internal Server Error. Something went wrong',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>Internal Server Error. Something went wrong</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml', 500);
  }

  const messageString = JSON.stringify(message);

  return respond(request, response, messageString, 'application/json', 500);
};

const notImplemented = (request, response, acceptedTypes) => {
  const message = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>A get request for this page has not been implemented yet. Check again later for updated content</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml', 501);
  }

  const messageString = JSON.stringify(message);

  return respond(request, response, messageString, 'application/json', 501);
};

const notFound = (request, response, acceptedTypes) => {
  const message = {
    message: 'The page you were looking for was not found',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>The page you were looking for was not found</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml', 404);
  }

  const messageString = JSON.stringify(message);

  return respond(request, response, messageString, 'application/json', 404);
};

const getIndex = (request, response) => {
  respond(request, response, index, 'text/html', 200);
};

const getCSS = (request, response) => {
  respond(request, response, css, 'text/css', 200);
};

module.exports = {
  getIndex,
  getCSS,
  success,
  badRequest,
  unauthorized,
  forbidden,
  internalError,
  notImplemented,
  notFound,
};
