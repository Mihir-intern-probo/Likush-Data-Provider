const { Worker } = require('worker_threads');

const orderBookWorker = async (event_id, end_time) => {
    try {
        return new Promise((resolve,reject)=>{
            const worker = new Worker('./app/services/orderBookDataService.js',{
                workerData:{
                    event_id: event_id,
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
module.exports = {orderBookWorker}   
