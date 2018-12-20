var path = require('path'); 
module.exports = function(app) {

    app.get('/posts', (req, res) => {
        res.send("Bad token");
    })

    app.get('/getComment', (req, res) => {
        var sql = "SELECT * FROM comment";
        con.query(sql, function (err, result) {
        if (err) console.log("Oops... Something went wrong");
        res.set('contentType', "application/json; charset=utf-8")
        res.json(result)
        })
    })

    app.delete('/deleteComment', function(req, res) {
        var id = req.query.id
            sql = "DELETE FROM comment WHERE ID = '" + id + "'";
            con.query(sql, function (err, result) {
            if (err)
            {
                console.log(err);
                return res.send('Error while the delete')
            }
            else
                console.log("1 delete recorded");
            })
            res.send('this is a delete');
    })

    app.put('/updateState', function(req, res) {
        var state = req.body.state == false ? 'Y' : 'N'
        var id = req.body.id
        console.log(`id : ${id} state: ${state}`)
        res.set('contentType', "application/json; charset=utf-8")
       
            sql = "UPDATE `comment` SET `IsValid` = ? WHERE `ID` = ?"
            con.query(sql, [state, id], function (err, result) {
            if (err){
                console.log(err);
                res.send({message: "Error while update", state: req.body.state})
            }
            else
                console.log("1 update of state recorded");
            })
            res.send({message: "Update Done", state: !req.body.state});
    })
    
    app.put('/updateComment', function(req, res) {
        var client = req.body.client
        var comment = req.body.comments
        var id = req.body.id
        var type = req.body.type

            if (err || !data) {
                console.log("Action Client declined")
                console.log("User want update the comment '" + id + "'")
                console.log("User name: " + req.user.User)
                res.send("You have not the rights to do that");
            } else if (data == true) {
                sql = "UPDATE comment SET `Client` = ?, `Data` = ?, `Type` = ? WHERE ID = ?"
                con.query(sql, [client, comment, type, id], function (err, result) {
                if (err){
                    console.log(err);
                    return res.send('Error while the update')
                }
                else
                    console.log("1 update recorded");
                })
                res.send('this is an update');
            }
    })

    app.post('/postComment', function(req, res) {
        var client = req.body.client
        var comment = req.body.comments
        var user = req.body.user
        var type = req.body.type
        console.log(req.body)
        var sql = "INSERT INTO comment (Client, Data, User, Type) VALUES (?, ?, ?, ?)"
        con.query(sql, [client, comment, user, type], function (err, result) {
        if (err)
        {
            console.log(err);
            return res.send('Error while the insertion')
        }
        console.log("1 record inserted");
        })
        res.set('Content-Type', 'text/plain')
        res.send(`OK`)
    
    });

    var mysql = require('mysql');
    
    var con = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "gaetan57",
        database: "commentdb"
    });
    
    con.connect(function(err) {
        if (err)
            console.log("Error while db co\n" + err);
        console.log("Connected!");
    });

    // app.get('/', function(req, res) {
    //     res.sendFile(path.join(__dirname, '../dist/index.html'));
    // });

    // route middleware to make sure a user is logged in

    function prepareArrayToString(arr) {
        var formatter = ''
        for (var i = 0; i < arr.length - 1; i++)
            formatter += arr[i] + '/'
        formatter += arr[i]
        return formatter
    }
}