import appConfig  from '../config';
import mongoose from 'mongoose';
import logger from '../util/logger';

export default class Database {
    constructor() {

        this._connect();
    }

    _connect(){

        mongoose.connect( appConfig.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
        .then(()=>{
            logger.debug(`database connected`);
        })
        .catch(err=>{

            logger.debug(`error in database connection`);
        })
    }
}