const express = require('express');
const fileupload = require('express-fileupload');

const app = express();
const port = 5001;
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

app.listen(process.env.PORT || port, () => console.log('listening on port', port));