const express = require("express");
const {dataController} = require('./controllers/dataSavingController.js');

const router = express.Router();

router.route('/checkPaperTradePlacement').post(dataController.saveData);

module.exports = router;