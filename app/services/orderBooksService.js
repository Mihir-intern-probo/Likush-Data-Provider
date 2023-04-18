const {socket} = require('../utils/socket');
const {client} = require('../utils/redis');

const orderBookService = {
    getorderBook: async(EVENT_ID, END_TIME) => {
        socket.emit('subscribe_orderbook', EVENT_ID); 
        socket.on(`event_orderbook_${EVENT_ID}`,async (response)=>{ 
            try{
                await client.set(`bap_yes_price_${EVENT_ID}`, JSON.stringify((response.BUY[0].price)), 'EX', 25 * 60);
                await client.set(`bap_yes_quantity_${EVENT_ID}`,JSON.stringify((response.BUY)[0].quantity), 'EX', 25 * 60);
                await client.set(`bap_no_price_${EVENT_ID}`,JSON.stringify((response.SELL)[0].price), 'EX', 25 * 60);
                await client.set(`bap_no_quantity_${EVENT_ID}`,JSON.stringify((response.SELL)[0].quantity), 'EX', 25 * 60);
                await client.set(`end_time_${EVENT_ID}`, JSON.stringify((END_TIME)), 'EX', 15 * 60);
            }catch(err){
                console.log("Error: ", err);
            }
        })
    },
    unsubscribeToOrderBook: async(EVENT_ID) => {
        try{
            socket.emit("unsubscribe_orderbook",EVENT_ID);
            console.log("Successfully left the room of orderbook");
        }catch(err){
            console.log("error while unsubscribing", err);
        }
    }
}

module.exports = {orderBookService};
