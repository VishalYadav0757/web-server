const request = require("request");

/*
We can use :-
const http = require("http"); || const https = require("https");
inplace of `request` and `http/https` are inbuilt libraries provides by node.js itself.
Need to change a little bit of code read the Node.Js docs for it.
`request` is an external library.
*/

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=5892532c70efa4b020802a34ed5fddfa&query=" +
    lat +
    "," +
    long;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Oops something went wrong :(", undefined);
    } else if (body?.error) {
      callback("No data found :(", undefined);
    } else {
      const data = body?.current;
      const temp = data?.temperature;
      const desc = data?.weather_descriptions[0];

      callback(
        undefined,
        desc + " and it is currently " + temp + " degrees outside."
      );
    }
  });
};

module.exports = forecast;
