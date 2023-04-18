const {dataServices} = require('../services/datasaving')
const {btcService} = require('../services/btcservices');
const {socket} = require('../utils/socket')
const {SOCKET_CONSTANTS} = require('../utils/Constants');
const {orderBookService} = require('../services/orderBooksService');

const dataController={
    saveData: async(req,res)=>{
        try{
            // CHECK FOR AUTHENTICATION
            await btcService.btcQuo();
            socket.emit('echo');
            socket.on('echo_successful',(data)=>{
                console.log(data);
            })
            socket.emit('subscribe_topic_event',SOCKET_CONSTANTS.CRYPTO_TOPIC_ID);
            socket.on(`new_topic_event_${SOCKET_CONSTANTS.CRYPTO_TOPIC_ID}`,async (response)=>{
                console.log(response);
                await orderBookService.getorderBook(response.skuDetail.event_id, response.eventDetails.end_date);
                await dataServices.dataSaving(response.skuDetail.event_id,response.skuDetail.tracking_metadata.target, response.eventDetails.end_date);
            })
	    console.log("Started Saving Event Details");
            res.status(200).json({status: " Working "})
        }catch(err){
            res.status(404).json({status: "error", error: `${err}`})
        }
    },
}




module.exports = {dataController};
