const authormastermodel = require("../Models/authormastermodel")
const multer = require('multer');
const path = require('path');

module.exports.authormasterget = async (req, res) => {
    await authormastermodel.find({},{
        _id: 0,
        author_name:1,
        author_profile_picture:1,
        category:1,
        'social_media.linkedin':1,
        'social_media.gmail':1 ,
        'social_media.instagram':1 ,
        'social_media.facebook':1 ,

      
    }).then((category) => {
            res.json(category);
        }).catch((err) => {
            res.status(500).json({ error: "Error getting samples", err });
        });
}

module.exports.authormasterinsert = async (req, res) => {
const { author_name, author_profilepicture, category, social_media } = req.body;
const { linkedin, instagram, gmail, facebook } = social_media;

await authormastermodel.create({
    author_name,
    author_profilepicture,
    category,
    'social_media.linkedin': linkedin,
    'social_media.instagram': instagram,
    'social_media.gmail': gmail,
    'social_media.facebook': facebook
}).then((user) => {
    res.json(user);
}).catch((err) => {
    res.status(500).json({ error: "Error saving samples", err });
});
}

module.exports.authormasterupdate = async (req, res) => {
    try {
      const id = req.params.id;
      const { author_name, author_profilepicture, category, social_media } = req.body;

      // Initialize social_media as an empty object if it doesn't exist
      const updateObject = {
        social_media: {}
      };
      
      if (author_name) updateObject.author_name = author_name;
      if (author_profilepicture) updateObject.author_profilepicture = author_profilepicture;
      if (category) updateObject.category = category;
      
      // Check if social_media exists before setting its properties
      if (social_media) {
        if (social_media.linkedin) updateObject.social_media.linkedin = social_media.linkedin;
        if (social_media.instagram) updateObject.social_media.instagram = social_media.instagram;
        if (social_media.gmail) updateObject.social_media.gmail = social_media.gmail;
        if (social_media.facebook) updateObject.social_media.facebook = social_media.facebook;
      }
      
      // const updatedRecord = await authormastermodel.findByIdAndUpdate(id, updateObject, { new: true });
      
      // if (!updatedRecord) {
      //   return res.status(404).json({ error: 'Record not found' });
      // }
      
      // // Step 4: Send Response
      // res.json({ message: 'Record updated successfully', data: updatedRecord });
      

    

      const updatedRecord = await authormastermodel.findByIdAndUpdate(id, updateObject, { new: true });
  
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

  module.exports.authormasterdelete = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedRecord = await authormastermodel.findByIdAndDelete(id);
  
      if (!deletedRecord) {
        return res.status(404).json({ error: 'Record not found' });
      }
  
      res.json({ message: 'Record deleted successfully', data: deletedRecord });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports.authoruploadprofile = async (req, res ,next) => {
    try {
        let UploadedfileName = '';
        const filePath = path.join(__dirname + '/Authorprofile/Image');
        const Storage = multer.diskStorage({
            destination: filePath,
            filename: (req, file, cb) => {
                const originalname = file.originalname;
                const fileExtension = path.extname(originalname); // Get the file extension
                const uniqueSuffix = Date.now(); // Generate a unique suffix
                const newFilename = path.basename(originalname, fileExtension) + '-' + uniqueSuffix + fileExtension; // Construct the new filename
                UploadedfileName = '/Authorprofile/Image/' + newFilename;
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
        }).single('author_profile');
        upload(req, res, async function (err) {
            if (err) {
              if( err instanceof multer.MulterError && err.code =="LIMIT_FILE_SIZE"){
                return res.send("File size is maximum 2 MB")
               }
                // Handle upload error
                console.log(err);
                return res.status(500).send('Error uploading file.' + err);
            }
            res.json({ author_profilepicture: UploadedfileName }); // Send a JSON response
        });
    
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error Message Image Upload" + error });
    }
  };