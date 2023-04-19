const {btcService} = require('./btcservices');
const {client} = require('../utils/redis');
const formatDate = require('../utils/date');
const {likushData} = require('../models/likushData');
const {orderBookService} = require('../services/orderBooksService');

    const dataServices = {
        dataSaving: async (event_id, target_price, end_time) => {
            try {
		console.log(event_id, target_price, end_time, moment(end_time).unix(), moment(new Date).unix());
                const latestRecord = await btcService.btcLatestRecord()
                let bap_yes_price, bap_no_price, bap_yes_quantity, bap_no_quantity;   
                bap_yes_price=await client.get(`bap_yes_price_${event_id}`)
                bap_no_price=await client.get(`bap_no_price_${event_id}`)
                bap_yes_quantity=await client.get(`bap_yes_quantity_${event_id}`)
                bap_no_quantity=await client.get(`bap_no_quantity_${event_id}`)
		const currentTime = formatDate();
                const val_created = await likushData.create({
                    trade_time: latestRecord.event_time,
                    Event_Id: event_id,
                    event_currency: "BTCUSDT",
                    tradesYES: bap_yes_quantity==null?0:parseFloat(bap_yes_quantity),
                    tradesNO: bap_no_quantity==null?0:parseFloat(bap_no_quantity),
                    Avg_Yes_Price: bap_yes_price==null?0:parseFloat(bap_yes_price),
                    Avg_No_Price: bap_no_price==null?0:parseFloat(bap_no_price),
                    price: target_price ,
                    time: latestRecord.event_time,
                    close: latestRecord.c_price,
                    createdAt: currentTime,
                    updatedAt: currentTime
            })
	    let loop;
	    console.log(moment(end_time).unix(), moment(new Date).unix());
            loop = setTimeout(()=>{dataServices.dataSaving(event_id, target_price, end_time)},1000);
            let date2 = new Date().toJSON();
	    console.log(moment(end_time).unix(), moment(date2).unix());
            if(moment(end_time).unix() <= moment(date2).unix()){
                clearTimeout(loop);
                orderBookService.unsubscribeToOrderBook(event_id)
            }
        } catch(err) {

        }
    }
}

module.exports = {dataServices}   
