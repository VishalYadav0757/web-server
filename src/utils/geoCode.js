const request = require("request");

/*
We can use :-
const http = require("http"); || const https = require("https");
inplace of `request` and `http/https` are inbuilt libraries provides by node.js itself.
Need to change a little bit of code read the Node.Js docs for it.
`request` is an external library.
*/

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoidmlzaGFsLXlhZGF2IiwiYSI6ImNscHdnajdudzBnOWkydm8yajkyMjM2NHEifQ.Srii6M_DvCSQozbVSxNl4A&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Oops something went wrong :(", undefined);
    } else if (body?.features?.length <= 0) {
      callback("No data found :(", undefined);
    } else {
      const data = body?.features[0];
      const location = data?.place_name;
      const coordinates = data?.center;
      const long = coordinates?.[0];
      const lat = coordinates?.[1];

      callback(undefined, {
        location: location,
        latitude: lat,
        longitude: long,
      });
    }
  });
};

module.exports = geoCode;
