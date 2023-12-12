const express = require('express');
const HTTP_SERVER=express();
const cors=require('cors');
const bodyParser = require('body-parser')
require('./mongodb/mongodbconfig')

const path = require('path');

const PORT=process.env.PORT || 4000;











const staticResAudioPath = path.join(__dirname, '/Controllers/audiouploadcontroller/AudioUploading/Audio');

HTTP_SERVER.use('/AudioUploading/Audio', express.static(staticResAudioPath));

const staticlanguageImagePath = path.join(__dirname, '/Controllers/authormastercontroller/languageImageUpload/Image');

HTTP_SERVER.use('/languageImageUpload/Image', express.static(staticlanguageImagePath));

const staticcategoryImagePath = path.join(__dirname, '/Controllers/authormastercontroller/languageImageUpload/Image');

HTTP_SERVER.use('/languageImageUpload/Image', express.static(staticcategoryImagePath));

const staticauthorprofilePath = path.join(__dirname, '/Controllers/authormastercontroller/Authorprofile/Image');

HTTP_SERVER.use('/Authorprofile/Image', express.static(staticauthorprofilePath));





HTTP_SERVER.use(express.json())
HTTP_SERVER.use(bodyParser.json())
HTTP_SERVER.use(express.urlencoded({extended: false}))
HTTP_SERVER.use(cors())

HTTP_SERVER.listen(PORT,()=>{
    console.log(`Listening at ${PORT}`)
});

HTTP_SERVER.use('/', require("./app"));