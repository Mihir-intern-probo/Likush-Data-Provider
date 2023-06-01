const express = require("express");
const {dataController} = require('./controllers/dataSavingController.js');

const router = express.Router();

router.route('/dataSaving1').post(dataController.saveData);

module.exports = router;
