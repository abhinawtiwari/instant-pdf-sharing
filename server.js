const express = require('express');
const fileupload = require('express-fileupload');

const app = express();
app.use(fileupload());

// upload endpoint
app.post('/upload', (req, res) => {
    if(req.files === null) {
        return res.status(400).json({message: 'No files were uploaded'});
    }

    const file = req.files.file;
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        console.error(err);
        return res.status(500).send(err);
    });

    res.json({filename: file.name, filepath: `/uploads/${file.name}`});
})

app.listen(5001, () => console.log('listening on port', 5001));