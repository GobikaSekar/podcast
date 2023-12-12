const categorymastermodel = require("../Models/categorymastermodel")
const multer = require('multer');
const path = require('path');

//Viewing a Data
module.exports.categorymasterget = async (req, res) => {
    await categorymastermodel.find({},{
        _id: 0,
        category_name:1,
        category_image:1,
      
    }).then((category) => {
            res.json(category);
        }).catch((err) => {
            res.status(500).json({ error: "Error getting samples", err });
        });
}

module.exports.categorymasterinsert=async(req,res) =>{
    const {category_name ,category_image } = req.body
    await categorymastermodel.create({category_name , category_image}).then((user) => {
            res.json(user);
        }).catch((err) => {
            res.status(500).json({ error: "Error saving samples", err });
        });
}

module.exports.categorymasterupdate = async (req, res) => {
    try {
      const { id } = req.params;
      const { category_name, category_namecategory_name } = req.body;
  
      // Build the update object based on the fields you want to update
      const updateObject = {};
      if (category_name) updateObject.category_name = category_name;
      if (category_image) updateObject.category_image = category_image;
    
  
      const updatedRecord = await categorymastermodel.findByIdAndUpdate(id, updateObject, { new: true });
  
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





  module.exports.categorymasterdelete = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedRecord = await categorymastermodel.findByIdAndDelete(id);
  
      if (!deletedRecord) {
        return res.status(404).json({ error: 'Record not found' });
      }
  
      res.json({ message: 'Record deleted successfully', data: deletedRecord });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports.categoryuploadimage = async (req, res ,next) => {
    try {
        let UploadedfileName = '';
        const filePath = path.join(__dirname + '/categoryImageUpload/Image');
        const Storage = multer.diskStorage({
            destination: filePath,
            filename: (req, file, cb) => {
                const originalname = file.originalname;
                const fileExtension = path.extname(originalname); // Get the file extension
                const uniqueSuffix = Date.now(); // Generate a unique suffix
                const newFilename = path.basename(originalname, fileExtension) + '-' + uniqueSuffix + fileExtension; // Construct the new filename
                UploadedfileName = '/categoryImageUpload/Image/' + newFilename;
                cb(null, newFilename);
            }
        });
  
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
        }).single('category_image');
        upload(req, res, async function (err) {
            if (err) {
              if( err instanceof multer.MulterError && err.code =="LIMIT_FILE_SIZE"){
                return res.send("File size is maximum 2 MB")
               }
                // Handle upload error
                console.log(err);
                return res.status(500).send('Error uploading file.' + err);
            }
            res.json({ category_image: UploadedfileName }); // Send a JSON response
        });
    
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error Message Image Upload" + error });
    }
  };