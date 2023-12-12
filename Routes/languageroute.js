const Router = require("express")


const {languagemasterget ,languageinsert,languagemasterupdate,languagemasterDelete,languageuploadimage}=require("../Controllers/languagecontroller")

const router = Router()


router.get("/languagemasterget",languagemasterget);
router.post("/languageinsert",languageinsert);
router.post("/languagemasterupdate/:id",languagemasterupdate);
router.post("/languagemasterDelete/:id",languagemasterDelete);
router.post("/languageuploadimage",languageuploadimage);


module.exports = router;