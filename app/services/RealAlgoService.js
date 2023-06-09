const {btcService} = require('./btcservices');
const {likushData} = require('../models/likushData')
const moment = require('moment');
const { workerData, parentPort } = require('worker_threads');
const {orderBookService} = require('./orderBooksService');
const {client} = require('../utils/redis')
const formatDate = require('../utils/date');
let loop;

const realAlgoService = async(event_id, target_price, end_time) => {
    try {
        let date2 = new Date().toJSON();
        const latestRecord = await btcService.btcLatestRecord()
        let bap_yes_price, bap_no_price, bap_yes_quantity, bap_no_quantity;   
        bap_yes_price=await client.get(`bap_yes_price_${event_id}`)
        bap_no_price=await client.get(`bap_no_price_${event_id}`)
        bap_yes_quantity=await client.get(`bap_yes_quantity_${event_id}`)
        bap_no_quantity=await client.get(`bap_no_quantity_${event_id}`)
		const currentTime = formatDate();
        likushData.create({
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
        const currentDate = new Date().toJSON();
        if(moment(end_time).unix() <= moment(currentDate).unix()){
            clearTimeout(loop);
        }
        loop = setTimeout(()=>{realAlgoService(event_id, target_price, end_time)},1000);
    } catch(err) {
        console.log(err);
    }
}


const main = async() => {
    const ans = await realAlgoService(workerData.event_id, workerData.target_price, workerData.end_time);
    parentPort.postMessage(ans);
}

main()
