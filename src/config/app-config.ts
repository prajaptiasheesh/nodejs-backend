import { AppConfig } from "./types/app-config";


export default function (): AppConfig{

    const ENV: Node.ProcessEnv = process.env as any;

    if(ENV.NODE_ENV === 'production'){

        return {
            MONGODB_URI: ENV.MONGODB_URI,
            PORT: ENV.PORT,
            SESSION_SECRET: 'sdf4r34334`==-3434negf',
            DB_HOST: 'database-mysql.cgbacakbp5ty.us-east-1.rds.amazonaws.com',
            DB_PORT: 3306,
            DB_USERNAME: 'asheesh',
            DB_PASSWORD: 'G8nMWr6Jz7uywwaq',
            DB_NAME: 'incentive',
        }
    }else{

        return {
            MONGODB_URI: ENV.MONGODB_URI_LOCAL,
            PORT: ENV.PORT,
            SESSION_SECRET: ENV.SESSION_SECRET,
            DB_HOST: 'database-mysql.cgbacakbp5ty.us-east-1.rds.amazonaws.com',
            DB_PORT: 3306,
            DB_USERNAME: 'asheesh',
            DB_PASSWORD: 'G8nMWr6Jz7uywwaq',
            DB_NAME: 'incentive',
        }
    }

}