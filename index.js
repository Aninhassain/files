const express = require('express');
const app = express();
const fs = require('fs');
app.set('view engine', 'ejs'); // Set EJS as the view engine

app.use(express.json()); // middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.get('/', function (req, res) {
  fs.readdir('./public/allfiles/', function(err, files) {
    res.render('index', { allfiles: files || [] });
  });
});
app.get('/read/:filename',function(req,res){
     const filename= req.params.filename +'.txt';
     fs.readFile(`./public/allfiles/${filename}`,'utf-8',function(err,data){
        if(err){
            res.render('index');
        }
        if(data.length>0){
             res.render('read',{data:data});
        }
        else{
            console.log("no data");
            res.redirect('/');
        }
  
     })
})
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