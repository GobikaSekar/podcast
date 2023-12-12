const Router = require("express")

const router =Router()

const{audiouploadmasterget,audiouplodmasterinsert,audiouplodmasterupdate,audiouploadmasterdelete , audiouploadImages,audiouploadAudio} =require("../Controllers/audiouploadcontroller")

router.get("/audiouploadmasterget",audiouploadmasterget);
router.post("/audiouplodmasterinsert",audiouplodmasterinsert);
router.post("/audiouploadImages",audiouploadImages);
router.post("/audiouplodmasterupdate/:id",audiouplodmasterupdate);
router.post("/audiouploadmasterdelete/:id",audiouploadmasterdelete);
router.post("/audiouploadAudio/",audiouploadAudio);

module.exports = router;