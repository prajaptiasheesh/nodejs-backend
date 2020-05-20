import { AppConfig } from "./types/app-config";


export default function (): AppConfig{

    const ENV: Node.ProcessEnv = process.env as any;

    if(ENV.NODE_ENV === 'production'){

        return {
            MONGODB_URI: ENV.MONGODB_URI,
            PORT: ENV.PORT,
            SESSION_SECRET: 'sdf4r34334`==-3434negf'
        }
    }else{

        return {
            MONGODB_URI: ENV.MONGODB_URI_LOCAL,
            PORT: ENV.PORT,
            SESSION_SECRET: ENV.SESSION_SECRET
        }
    }

}