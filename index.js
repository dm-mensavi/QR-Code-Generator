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
const port = process.env.PORT || 5000;
var imgSrc = "defaultQR.png";
var inputUrl = "";

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.render("index", { imgSrc, inputUrl });
});

app.post("/", (req, res) => {
	var source = "'" + req.body.url + "'";

	var qr_png = qr.image(source, { type: "png" });
	qr_png.pipe(fs.createWriteStream("./public/QR.png"));

	imgSrc = "QR.png";

	res.render("index", { imgSrc, inputUrl });
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
