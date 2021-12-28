import "./util/env";
import Database from './database/chat-database';
import appConfig from './config';
import express from 'express';
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import mongo from "connect-mongo";
import flash from "express-flash";
import path from "path";
import UserRoutes from './routes/user.route';
import runSample from './gmail-data-puller';



const MongoStore = mongo(session);
const app = express();

const db = new Database()

app.set("port", appConfig.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: appConfig.SESSION_SECRET,
    store: new MongoStore({
        url: appConfig.MONGODB_URI,
        autoReconnect: true,
    }),
}))

app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);



const userRouter = new UserRoutes()

app.use('/api/v1/user', userRouter.router);

// runSample().then(res=>{
// }).catch(console.error);

export default app;