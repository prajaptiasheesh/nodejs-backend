import app from './app';
import http from 'http';
import logger from './util/logger';
import errorhandler from 'errorhandler';
import { Request, Response } from 'express';

const server = http.createServer(app);

app.use(errorhandler({ log: errorNotification }))

function errorNotification(err: Error, msg: any, req: Request, res: Response){

     console.log(msg);
     
}
server.listen(app.get('port'), ()=>{

     logger.debug(`listening on port ${app.get('port')}`);

})