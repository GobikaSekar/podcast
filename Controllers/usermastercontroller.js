const usermastermodel = require("../Models/usermastermodel")

//Viewing a Data
module.exports.usermasterget = async (req, res) => {
    await usermastermodel.find({},{
        _id: 0,
        user_name:1,
        mobile:1,
        email:1,
        gender:1
    }).then((user) => {
            res.json(user);
        }).catch((err) => {
            res.status(500).json({ error: "Error getting samples", err });
        });
}

module.exports.usermasterInsert=async(req,res) =>{
    const {user_name ,mobile,email,gender } = req.body
    await usermastermodel.create({user_name , mobile, email,gender}).then((user) => {
            res.json(user);
        }).catch((err) => {
            res.status(500).json({ error: "Error saving samples", err });
        });
}


module.exports.usermasterupdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_name, mobile, email, gender } = req.body;

    // Build the update object based on the fields you want to update
    const updateObject = {};
    if (user_name) updateObject.user_name = user_name;
    if (mobile) updateObject.mobile = mobile;
    if (email) updateObject.email = email;


    if (gender) updateObject.gender = gender;

    const updatedRecord = await usermastermodel.findByIdAndUpdate(id, updateObject, { new: true });

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


module.exports.usermasterDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRecord = await usermastermodel.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json({ message: 'Record deleted successfully', data: deletedRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
