
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Endpoint principal
app.get("/api", function (req, res) {
  const date = new Date();

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Endpoint para recibir una fecha
app.get("/api/:date", function (req, res) {
  const inputDate = req.params.date;

  let date;

  if (!isNaN(inputDate)) {
    date = new Date(Number(inputDate));
  } else {
    date = new Date(inputDate);
  }

  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Iniciar servidor
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
