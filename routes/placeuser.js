var express = require('express');
var router = express.Router();

/* Receive event suscription with temperature change */
router.post('/', function(req, res, next) {
  console.log(JSON.stringify(req.body));
  var eventIncoming = req.body;

  if (eventIncoming.data && eventIncoming.data[0].temperature && eventIncoming.data[0].location) {
    var idPlace = eventIncoming.data[0].id;
    var temperature = eventIncoming.data[0].temperature.value;
    var location = eventIncoming.data[0].location.value;

    console.log("Temperatura changed. Place: " + idPlace + " - Temp: " + temperature);

    //TODO: Buscar todos los User que estén dentro de location y actualizar sus temperaturas

    res.send('respond with a resource');
  }
});

module.exports = router;
