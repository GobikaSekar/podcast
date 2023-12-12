const Router = require("express")


const {usermasterInsert , usermasterget,usermasterupdate , usermasterDelete}=require("../Controllers/usermastercontroller")

const router = Router()


router.get("/usermasterget",usermasterget);
router.post("/usermasterInsert",usermasterInsert);
router.post("/usermasterupdate/:id",usermasterupdate);
router.post("/usermasterDelete/:id",usermasterDelete);

module.exports = router;