import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";

inquirer
    .prompt([
        {
            "message": "Please type in your URL: ",           //Pass your questions in here 
            "name": "URL",
        }
    ])
    .then((answers) => {
        const url = answers.URL;
        console.log(url);
        let qr_svg = qr.image(url);
        qr_svg.pipe(fs.createWriteStream('QR-image.png'));

        fs.writeFile('URL.txt', url, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    })
    .catch((error) => {
        if (error.isTtyError) {
            throw new Error(`Prompt couldn't be rendered in the current environment`);
        } else {
            console.log("Something else went wrong");
        }
    });

