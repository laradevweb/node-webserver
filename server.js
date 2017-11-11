const express = require('express');
const hbs     = require('hbs');
const fs      = require('fs');


var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	  var now = new Date().toString();
	  var log = `${now}.:${req.method}: ${req.url}`;
	   
	   //fs.appendFile(`server.log` log +'\n');

	  fs.appendFile('server.log', log+ '\n', (err) => {
	  	   if (err) {
	  	   	 console.log('Unable to append to server.log');
	  	   }
	  });
	  console.log(log);
	  next();
});

app.use((req, res, next) =>  {
	  res.render('maintenance.hbs');
});

hbs.registerHelper('getCurrentYear', () => {
          return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});


app.get('/', (req, res) => {
     //res.send('Hello Express');
     /*res.send({
     	   name:'Khan',
     	   likes:['Biking','Cities']
     });*/

     res.render('home.hbs', {
     	   pageTitle: 'Home Page',
     	   /*currYear : new Date().getFullYear()*/
     });
});

app.get('/about',(req, res) => {
	  //res.send('About Page');
	  res.render('about.hbs',{
	  	  pageTitle: 'About Page',
	  	  /*currYear : new Date().getFullYear()*/
	  });
});

app.get('/bad', function(req, res){
	   res.send({
	   	   errMesg: 'Unable to handle request'
	   });
	});

app.listen(3000, () => {
	console.log('Server is Running.... port localhost:3000');
});
