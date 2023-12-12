const mongoose = require("mongoose")
const { Schema } = mongoose;

const UserMasterSchema = new Schema(
    {
        user_name: { type: String, require: true  },
        mobile: { type: Number },
        email:{type:String,require:true},
        gender:{type:String}
    }
);

module.exports = mongoose.model("user_master", UserMasterSchema);