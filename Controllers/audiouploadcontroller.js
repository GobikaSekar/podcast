const audiouploadmodel = require("../Models/audiouploadmodel");
const multer = require('multer');
const path = require('path');


module.exports.audiouploadmasterget = async (req, res) => {
    await audiouploadmodel.find({},{
        _id: 0,
        audio_title:1,
        audio_upload:1,
        branner:1,
        category:1,
        language:1,
        description:1,
        duration:1,
        author_name:1,      
    }).then((category) => {
            res.json(category);
        }).catch((err) => {
            res.status(500).json({ error: "Error getting samples", err });
        });
}

module.exports.audiouplodmasterinsert=async(req,res) =>{
    const {audio_title ,audio_upload ,branner,category,language,description,duration,author_name} = req.body
    await audiouploadmodel.create({audio_title , audio_upload,branner,category,language,description,duration,author_name}).then((user) => {
            res.json(user);
        }).catch((err) => {
            res.status(500).json({ error: "Error saving samples", err });
        });
}

module.exports.audiouplodmasterupdate = async (req, res) => {
    try {
      const { id } = req.params;
      const { audio_title, audio_upload,branner, category,language,description,duration,author_name} = req.body;
  
      // Build the update object based on the fields you want to update
      const updateObject = {};
      if (audio_title) updateObject.audio_title = audio_title;
      if (audio_upload) updateObject.audio_upload = audio_upload;
      if (branner) updateObject.branner = branner;
      if (category) updateObject.category = category;
      if (language) updateObject.language = language;
      if (description) updateObject.description = description;
      if (duration) updateObject.duration = duration;
      if (author_name) updateObject.author_name = author_name;
       
  
      const updatedRecord = await audiouploadmodel.findByIdAndUpdate(id, updateObject, { new: true });
  
      if (!updatedRecord) {
        return res.status(404).json({ error: 'Record not found' });
      }
  
      // Step 4: Send Response
      res.json({ message: 'Record updated successfully', data: updatedRecord });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  module.exports.audiouploadmasterdelete = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedRecord = await audiouploadmodel.findByIdAndDelete(id);
  
      if (!deletedRecord) {
        return res.status(404).json({ error: 'Record not found' });
      }
  
      res.json({ message: 'Record deleted successfully', data: deletedRecord });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports.audiouploadImages = async (req, res ,next) => {
    try {
        let UploadedfileName = '';
        const filePath = path.join(__dirname + '/AudioUploads/Image');
        const Storage = multer.diskStorage({
            destination: filePath,
            filename: (req, file, cb) => {
                const originalname = file.originalname;
                const fileExtension = path.extname(originalname); // Get the file extension
                const uniqueSuffix = Date.now(); // Generate a unique suffix
                const newFilename = path.basename(originalname, fileExtension) + '-' + uniqueSuffix + fileExtension; // Construct the new filename
                UploadedfileName = '/AudioUploads/Image/' + newFilename;
                cb(null, newFilename);
            }
        });
        let maxsize=2*1000*1000
        const upload = multer({ storage: Storage,
                                limits:{
                                  fileSize:maxsize
                                },
                                fileFilter:function(req,file,cb){
                                  let filetypes = /jpeg|jpg|png/;
                                  let mimetype = filetypes.test(file.mimetype);
                                  let extname = filetypes.test(path.extname(file.originalname))
                                    if(mimetype && extname){
                                      return cb(null,true)
                                    }
                                    cb("Error: Only supports jpeg,png,jpg")
                                }
        }).single('branner');
        upload(req, res, async function (err) {
            if (err) {
              if( err instanceof multer.MulterError && err.code =="LIMIT_FILE_SIZE"){
               return res.send("File size is maximum 2 MB")
              }
                // Handle upload error
                console.log(err);
                return res.status(500).send('Error uploading file.' + err);
            }
            res.json({ Branner: UploadedfileName }); // Send a JSON response
        });
    
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error Message Image Upload" + error });
    }
};


module.exports.audiouploadAudio = async (req, res ,next) => {
  try {
      let UploadedfileName = '';
      const filePath = path.join(__dirname + '/AudioUploading/Audio');
      const Storage = multer.diskStorage({
          destination: filePath,
          filename: (req, file, cb) => {
              const originalname = file.originalname;
              const fileExtension = path.extname(originalname); // Get the file extension
              const uniqueSuffix = Date.now(); // Generate a unique suffix
              const newFilename = path.basename(originalname, fileExtension) + '-' + uniqueSuffix + fileExtension; // Construct the new filename
              UploadedfileName = '/AudioUploading/Audio/' + newFilename;
              cb(null, newFilename);
          }
      });

      const upload = multer({ storage: Storage }).single('audioupload_audio');
      upload(req, res, async function (err) {
          if (err) {
              // Handle upload error
              console.log(err);
              return res.status(500).send('Error uploading file.' + err);
          }
          res.json({ audio_upload: UploadedfileName }); // Send a JSON response
      });
  
  }
  catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error Message Image Upload" + error });
  }
};