
function set(app){
    app.get('/', function(req, res){ 
        console.log("yeee");
        res.render("index") 
    }); 
}

module.exports = {
    set,
}