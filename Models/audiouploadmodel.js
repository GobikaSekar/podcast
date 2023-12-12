const mongoose = require("mongoose")
const { Schema } = mongoose;

const AudioMasterSchema = new Schema(
    {
        audio_title: { type: String, require: true  },
        audio_upload: { type: String,require: true  },
        branner:{type:String},
        category:{type:String},
        language:{type:String},
        description:{type:String},
        duration:{type:String} ,
        author_name:{type:String,require: true}  
        
        
    }
);

module.exports = mongoose.model("audio_upload", AudioMasterSchema);