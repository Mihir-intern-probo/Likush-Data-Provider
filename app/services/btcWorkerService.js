const { Worker } = require('worker_threads');

const btcWorkerService = async () => {
    try {
        return new Promise((resolve,reject)=>{
            const worker = new Worker('./Likush-Data-Provider/app/services/btcRecordDataService.js');
            worker.on('message' ,(data)=>{
                resolve(data);
            })
            worker.on('error',(data)=>{
                reject(data);
            })
            worker.on('exit',(code)=>{
                console.log(`Worker file stopped working with code ${code}`);
            })
        })
} catch(err) {
    console.log(err);
}
}
module.exports = {btcWorkerService}   
