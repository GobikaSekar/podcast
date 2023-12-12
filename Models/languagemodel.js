const mongoose = require("mongoose")
const { Schema } = mongoose;

const LanguageSchema = new Schema(
    {
        language_name: { type: String, require: true  },
        language_image: { type: String },
        
    }
);

module.exports = mongoose.model("language_master", LanguageSchema);