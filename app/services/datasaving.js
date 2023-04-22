const {btcService} = require('./btcservices');
const {client} = require('../utils/redis');
const formatDate = require('../utils/date');
const {likushData} = require('../models/likushData');
const {orderBookService} = require('../services/orderBooksService');
const { Worker } = require('worker_threads');

    const dataServices = {
        dataSaving: async (event_id, target_price, end_time) => {
            try {
                return new Promise((resolve,reject)=>{
                    const worker = new Worker('./Likush-Data-Provider/app/services/RealAlgoService.js',{
                        workerData:{
                            event_id: event_id,
                            target_price, target_price,
                            end_time: end_time
                        }
                    });
                    worker.on('message' ,(data)=>{
                        resolve(data);
                    })
                    worker.on('error',(data)=>{
                        reject(data);
                    })
                    worker.on('exit',(code)=>{
                        if(code!=0){
                            reject(new Error(`Worker file stopped working with code ${code}`))
                        }
                    })
                })
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = {dataServices}   
