const mongoose = require("mongoose")
const { Schema } = mongoose;

const CategoryMasterSchema = new Schema(
    {
        category_name: { type: String, require: true  },
        category_image: { type: String }
        
    }
);

module.exports = mongoose.model("catergory_master", CategoryMasterSchema);