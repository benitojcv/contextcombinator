var express = require('express');
var entities = require('../services/entities');
var router = express.Router();

/* Receive event suscription with temperature change */
router.post('/', function(req, res, next) {
  // console.log(JSON.stringify(req.body));
  var eventIncoming = req.body;

  if (eventIncoming.data && eventIncoming.data[0].temperature && eventIncoming.data[0].location) {
    var idPlace = eventIncoming.data[0].id;
    var temperature = eventIncoming.data[0].temperature.value;
    var location = eventIncoming.data[0].location.value;

    console.log("Temperatura changed. Place: " + idPlace + " - Temp: " + temperature);

    //Buscar todos los User que estén dentro de location y actualizar sus temperaturas
    entities.getUserByLocation(location).then(function(req1) {
      var usersFinded = JSON.parse(req1.body);

      usersFinded.forEach(function(user){
        console.log("Found user " + user.id);

        // Actualizar la temperatura del usuario
        entities.updateUserTemperature(user.id, temperature).then(function(req2) {
          console.log("Temperature changed for user " + user.id);
        }).catch(function(error) {
          res.status(500).send("ERROR update user temperature");
        });
      });

      res.status(200).send("Temperature changed in all near users");
    }).catch(function(error) {
      res.status(500).send("ERROR in search Users by location");
    });


  }
});

module.exports = router;
