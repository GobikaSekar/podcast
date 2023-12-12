const mongoose = require("mongoose")
const { Schema } = mongoose;

const AuthorMasterSchema = new Schema(
    {
        author_name: { type: String, require: true  },
        author_profile_picture: { type: String },
        category:{type:String},
        social_media:{
            linkedin:{type:String},
            gmail:{type:String},
            instagram:{type:String},
            facebook:{type:String}   
        }
        
    }
);

module.exports = mongoose.model("author_master", AuthorMasterSchema);