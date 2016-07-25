var request = require('request');

var ORION_URL = 'http://localhost:1026/v2';
var RADIUS_SEARCH = 2000;

module.exports = {
  getUserByLocation: function(location) {
    return new Promise(function(resolve, reject) {
      var reqOrion = ORION_URL + '/entities' + '?type=User' + '&georel=near;maxDistance:' + RADIUS_SEARCH + '&geometry=point&coords=' + location;
      // console.log(reqOrion);
      request({
        url: reqOrion,
        method: 'GET'
      }, function(error, request, body) {
        if (request.statusCode != 200)
          reject(error);
        else
          resolve(request);
      });
    });
  },
  updateUserTemperature(user, temperature) {
    return new Promise(function(resolve, reject) {
      request({
        url: ORION_URL + '/entities/' + user + '/attrs',
        method: 'POST',
        json: {
                "temperature": {
                  "value": temperature,
                  "type": "Float"
                }
              }
      }, function(error, request, body) {
        if (request.statusCode != 204)
          reject(error);
        else
          resolve(request);
      });
    });
  }
};
