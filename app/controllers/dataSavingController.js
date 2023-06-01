const {dataServices} = require('../services/datasaving')
const {socket} = require('../utils/socket')
const {SOCKET_CONSTANTS} = require('../utils/Constants');
const {btcWorkerService} = require('../services/btcWorkerService');
const {btcService} = require('../services/btcservices');
const {likushData} = require('../models/likushData')
const moment = require('moment');
const {client} = require('../utils/redis')
const formatDate = require('../utils/date');
const { exec } = require('child_process');

const dataController={
    timeoutFunction: async(req) => {
	let date2 = new Date().toJSON();
            const latestRecord = await btcService.btcLatestRecord()
            let bap_yes_price, bap_no_price, bap_yes_quantity, bap_no_quantity;
            bap_yes_price=await client.get(`bap_yes_price_${req.body.EVENT_ID}`)
            bap_no_price=await client.get(`bap_no_price_${req.body.EVENT_ID}`)
            bap_yes_quantity=await client.get(`bap_yes_quantity_${req.body.EVENT_ID}`)
            bap_no_quantity=await client.get(`bap_no_quantity_${req.body.EVENT_ID}`)
            const currentTime = formatDate();
            likushData.create({
                trade_time: latestRecord.event_time,
                Event_Id: req.body.EVENT_ID,
                event_currency: "BTCUSDT",
                tradesYES: bap_yes_quantity==null?0:parseFloat(bap_yes_quantity),
                tradesNO: bap_no_quantity==null?0:parseFloat(bap_no_quantity),
                Avg_Yes_Price: bap_yes_price==null?0:parseFloat(bap_yes_price),
                Avg_No_Price: bap_no_price==null?0:parseFloat(bap_no_price),
                price: req.body.TARGET ,
                time: latestRecord.event_time,
                close: latestRecord.c_price,
                createdAt: currentTime,
                updatedAt: currentTime
            });
            const currentDate = new Date().toJSON();
            console.log(currentDate, req.body);
            if(moment(req.body.END_TIME).unix() <= moment(currentDate).unix()){
                console.log('Terminating');
                const command = 'pm2 restart 0';
                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error executing command: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.error(`Command execution returned an error: ${stderr}`);
                        return;
                    }
                    console.log(`Command output:\n${stdout}`);
                });
            }
            setTimeout(()=>{dataController.timeoutFunction(req)}, 1000);
    },
    saveData: async(req,res)=>{
        try{
	    dataController.timeoutFunction(req);
	    console.log("Started Saving Event Details");
            res.status(200).json({status: " Working "})
        }catch(err){
            res.status(404).json({status: "error", error: `${err}`})
        }
    },
}




module.exports = {dataController};
