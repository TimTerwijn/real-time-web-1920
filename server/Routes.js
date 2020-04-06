
function set(app){
    app.get('/', function(req, res) {
        res.render('index');
    }); 
}

module.exports = {
    set,
}



  
// // GET image name by id
// app.get('/image/:id', function(req, res) {
//     //get image name
//     const id = req.params.id;
//     const imageObject = require("Images.js");
//     const imageSource = imageObject.getImageNameById(id);

//     res.render('index', {"images": [imageSource], "lastId" : imageObject.getLastId(), "nextId" : imageObject.getNextId()});
// });
  
// // POST upload new image 
// app.get('/insert-image', function(req, res) {  
//     res.render('add-image', null);
// });
  
// // POST upload new image 
// app.post('/insert-image', uploadDisk.single("picture"), (req, res) => {
//     console.log(" file disk uploaded");
//     res.redirect('/');
// });

