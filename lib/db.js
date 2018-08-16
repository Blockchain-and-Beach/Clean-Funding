const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
module.exports = ()=>{
    function connect(){
        mongoose.connect('localhost:27017',{dbName: 'Clean_Funding'})
            .then(()=>{console.log('mongodb connected')})
            .catch(err=>{console.error(err)});
    }
    connect();
    mongoose.connection.on('disconnected', connect());
};