import inquirer from "inquirer";
import bodyParser from "body-parser";
import qr from "qr-image";
import fs from "fs";
import express from "express";
import ejs from "ejs";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));



const app = express();
const port = 5000;
var imgSrc = "defaultQR.png";

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render('index', {imgSrc});
});  


app.post("/", (req, res) => {

  var source = "'" + req.body.url + "'";

  console.log(source);
  
  var qr_png = qr.image(source, {type: 'png'});
  qr_png.pipe(fs.createWriteStream('./public/QR.png'));

  imgSrc = 'QR.png';

  res.render('index', {imgSrc});

})

//const URL = answers.URL;

    // fs.writeFile("URL.txt", URL, (err) => {
      //   if (err) throw err;
    //   console.log("The file has been saved successfully!");
    // });

//inquirer
// .prompt([
//     {
//       message: "Please enter your URL: ",
//       name: "URL"
      
//     }
//   ])
  // .then((answers) => {
  //   console.log(`The entered URL is ${answers.URL}`)
  //   const URL = answers.URL;

  //   var qr_png = qr.image(URL);
  //   qr_png.pipe(fs.createWriteStream('QR_Code.png'));

  //   fs.writeFile("URL.txt", URL, (err) => {
  //     if (err) throw err;
  //     console.log("The file has been saved successfully!");
  //   });

  // })
  // .catch((error) => {
  //   if (error.isTtyError){
  //     console.log("Couldn't be rendered in the current environment");      
  //   } 
  // });



  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
