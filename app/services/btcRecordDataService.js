const WebSocket = require('ws');
const {Crypto} = require("../models/cryptoModel");
const EVENT_CONSTANTS = require('../utils/Constants');
const dotenv = require('dotenv');
const formatDate = require('../utils/date');
dotenv.config();

const btcService = {
    btcQuo:async()=>{
        try{
            let socket = new WebSocket(EVENT_CONSTANTS.SOCKET_CONSTANTS.BINANCE_BTC_SOCKET);
            socket.onmessage=async(event)=>{
                const date = formatDate();
                await Crypto.create({event_type: JSON.stringify(JSON.parse(event.data).e),
                    event_time: Math.floor(JSON.parse(event.data).E/1000),
                    symbol: JSON.stringify(JSON.parse(event.data).s),
                    kline_start: Math.floor(JSON.parse(event.data).k.t/1000),
                    kline_close: Math.floor(JSON.parse(event.data).k.T/1000),
                    inter: JSON.stringify(JSON.parse(event.data).k.i),
                    f_trade_id: JSON.parse(event.data).k.f,
                    l_trade_id: JSON.parse(event.data).k.L,
                    o_price: JSON.parse(event.data).k.o,
                    c_price: JSON.parse(event.data).k.c,
                    h_price: JSON.parse(event.data).k.h,
                    l_price: JSON.parse(event.data).k.l,
                    base_asset_vol: JSON.parse(event.data).k.v,
                    No_Of_Tr: JSON.stringify(JSON.parse(event.data).k.n),
                    isKlClosed: JSON.parse(event.data).k.x,
                    quo_vol: JSON.parse(event.data).k.q,
                    taker_bs_vol: JSON.parse(event.data).k.V,
                    taker_quo_vol: JSON.parse(event.data).k.Q, 
                    Ig: JSON.parse(event.data).k.B,
                    createdAt: date,
                    updatedAt: date
                    })
            }
        }catch(err){
            throw new Error(`${err}`);
        }
    }
}
const main = async() => {
    await btcService.btcQuo();
}

main()