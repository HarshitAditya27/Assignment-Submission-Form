var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
const port = process.env.PORT || 3000;
const app = express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))
mongoose.connect(process.env.Url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on('error', () => console.log("Error in connecting to Database"))
db.once('open', () => console.log("Connected to Database"))
app.post("/fetch", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var regno = req.body.regno;
    var sub = req.body.sub;
    var data = {
        "name": name,
        "email": email,
        "Registration number": regno,
        "Link": sub
    }
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Assignment submitted successfully !")
    })
    return res.redirect('done.html')
})
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html')
}).listen(port, () => {
    console.log(`Server is running at ${port}`)
})
