const languagemodel = require("../Models/languagemodel")
const multer = require('multer');
const path = require('path');

module.exports.languagemasterget = async (req, res) => {
    await languagemodel.find({},{
        _id: 0,
        language_name:1,
        language_image:1,
     
    }).then((user) => {
            res.json(user);
        }).catch((err) => {
            res.status(500).json({ error: "Error getting samples", err });
        });
}

module.exports.languageinsert=async(req,res) =>{
    const {language_name ,language_image } = req.body
    await languagemodel.create({language_name , language_image}).then((user) => {
            res.json(user);
        }).catch((err) => {
            res.status(500).json({ error: "Error saving samples", err });
        });
}


module.exports.languagemasterupdate = async (req, res) => {
    try {
      const { id } = req.params;
      const { language_name, language_image} = req.body;
  
      // Build the update object based on the fields you want to update
      const updateObject = {};
      if (language_name) updateObject.language_name = language_name;
      if (language_image) updateObject.molanguage_imagebile = language_image;
    
      const updatedRecord = await languagemodel.findByIdAndUpdate(id, updateObject, { new: true });
  
      if (!updatedRecord) {
        return res.status(404).json({ error: 'Record not found' });
      }
  
      // Step 4: Send Response
      res.json({ message: 'Record updated successfully', data: updatedRecord });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  module.exports.languagemasterDelete = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedRecord = await languagemodel.findByIdAndDelete(id);
  
      if (!deletedRecord) {
        return res.status(404).json({ error: 'Record not found' });
      }
  
      res.json({ message: 'Record deleted successfully', data: deletedRecord });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports.languageuploadimage = async (req, res ,next) => {
    try {
        let UploadedfileName = '';
        const filePath = path.join(__dirname + '/languageImageUpload/Image');
        const Storage = multer.diskStorage({
            destination: filePath,
            filename: (req, file, cb) => {
                const originalname = file.originalname;
                const fileExtension = path.extname(originalname); // Get the file extension
                const uniqueSuffix = Date.now(); // Generate a unique suffix
                const newFilename = path.basename(originalname, fileExtension) + '-' + uniqueSuffix + fileExtension; // Construct the new filename
                UploadedfileName = '/languageImageUpload/Image/' + newFilename;
                cb(null, newFilename);
            }
        });
  
        const upload = multer({ storage: Storage ,
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
        }).single('language_image');
        upload(req, res, async function (err) {
            if (err) {
              if( err instanceof multer.MulterError && err.code =="LIMIT_FILE_SIZE"){
                return res.send("File size is maximum 2 MB")
               }
                // Handle upload error
                console.log(err);
                return res.status(500).send('Error uploading file.' + err);
            }
            res.json({ language_image: UploadedfileName }); // Send a JSON response
        });
    
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error Message Image Upload" + error });
    }
  };