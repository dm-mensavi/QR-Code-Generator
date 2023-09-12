import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      message: "Please enter your URL: ",
      name: "URL"

    }
  ])
  .then((answers) => {
    console.log(`The entered URL is ${answers.URL}`)
    const URL = answers.URL;

    var qr_png = qr.image(URL);
    qr_png.pipe(fs.createWriteStream('QR_Code.png'));

    fs.writeFile("URL.txt", URL, (err) => {
      if (err) throw err;
      console.log("The file has been saved successfully!");
    });

  })
  .catch((error) => {
    if (error.isTtyError){
      console.log("Couldn't be rendered in the current environment");      
    } 
  });