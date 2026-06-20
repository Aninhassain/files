const express = require('express');
const app = express();
const fs = require('fs');
app.set('view engine', 'ejs'); // Set EJS as the view engine

app.use(express.json()); // middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.get('/', function (req, res) {
  res.render('index');
});
app.post('/create', function (req, res){
    const filename=req.body.filename.split(' ').join('');
    const content=req.body.content;
    fs.writeFile(`./public/allfiles/${filename}.txt`, content, function(err){
        if(err) console.log(err);
    });
   res.redirect('/');
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});