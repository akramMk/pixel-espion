const sharp = require("sharp");

const app = require("express")();

const fs = require("fs");

const path = require("path");
const { error } = require("console");
const logFilePath = path.join(__dirname, "access.log")


app.set("trust proxy", true);

app.use((req, res, next) => {
    const now = new Date();
    const log = `${now.toISOString()} - IP: ${req.ip}, Requested File: ${req.path}`;
    fs.appendFile(logFilePath, log + "\n", (err) => {
        if (err) console.error("Error Writing to log file:", err);
    });
    next();
})

app.get("/img/:filename.png", (req, res) => {
    res.set("Content-type", "image/png");
    const width = 1;
    const height = 1;

    sharp({
        create: {
            width: width,
            height: height,
            channels: 4,
            background: { r: 255, g: 255, b:255, alpha:1}, 
        }
    })
    .png()
    .pipe(res)
})
app.listen(8080)