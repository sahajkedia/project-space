const dotenv = require('dotenv');
dotenv.config({
  path: './config.env',
});

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const multer = require('multer');
const serveIndex = require('serve-index');
const { getConnection } = require('./db/db_config');

const PORT = process.env.PORT || 8001;

const app = express();
app.use(cors());

const db = getConnection();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));
app.use('/uploads', serveIndex(__dirname + '/uploads'));

let upload = multer({ dest: 'uploads/' });

app.use(
  fileUpload({
    createParentPath: true,
  })
);

fs.readdirSync(__dirname + '/routes').forEach(function (file) {
  let name = file.substr(0, file.indexOf('.'));
  require('./routes/' + name)(app, db, upload, fs);
});
app.listen(PORT, () => {
  console.log(`APP is now running on port ${PORT}!`);
});
