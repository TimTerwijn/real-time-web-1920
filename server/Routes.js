
function set(app){
    app.get('/', function(req, res){ 
        res.render("index") 
    }); 
}

module.exports = {
    set,
}