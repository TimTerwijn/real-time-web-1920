const express = require('express');
const app = express();

const port = 3000;

// Tell the views engine/ejs where the template files are stored (Settingname, value)
app.set('views', 'client/views');

// Tell express to use a 'static' folder
app.use(express.static('client/static'));

// Link the templating engine to the express app
app.set('view engine', 'ejs');

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


// ROUTES!!!


// GET first image on main page
app.get('/', function(req, res) {
  //get image name
  const imageObject = require("./modules/Images.js");
  const images = imageObject.getAllImages();

  res.render('index', {"images": images, "lastId" : imageObject.getLastId(), "nextId" : imageObject.getNextId()});
});

// GET image name by id
app.get('/image/:id', function(req, res) {
  //get image name
  const id = req.params.id;
  const imageObject = require("./modules/Images.js");
  const imageSource = imageObject.getImageNameById(id);

  res.render('index', {"images": [imageSource], "lastId" : imageObject.getLastId(), "nextId" : imageObject.getNextId()});
});

// POST upload new image 
app.get('/insert-image', function(req, res) {
   
  res.render('add-image', null);
});

// POST upload new image 
app.post('/insert-image', uploadDisk.single("picture"), (req, res) => {
  console.log(" file disk uploaded");
  res.redirect('/');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));