const Router = require("express")

const router =Router()

const{authormasterget,authormasterinsert,authormasterupdate,authormasterdelete,authoruploadprofile} =require("../Controllers/authormastercontroller")

router.get("/authormasterget",authormasterget);
router.post("/authormasterinsert",authormasterinsert);
router.post("/authormasterupdate/:id",authormasterupdate);
router.post("/authormasterdelete/:id",authormasterdelete);
router.post("/authoruploadprofile",authoruploadprofile);

module.exports = router;