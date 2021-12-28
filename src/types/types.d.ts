/// <reference types="express" />

/**
 * This type definition augments existing definition
 * from @types/express-flash
 */
declare namespace Express {
    export interface Request {
        flash(event: string, message: any): any;
    }
}

declare module NodeJS  {
    interface Global {
        use: (name: Function)=>any
    }
}

interface Flash {
    flash(type: string, message: any): void;
}

declare module "express-flash";

type Mode = "development" | "production" | "test"
declare namespace Node {
    export interface ProcessEnv
    {
        NODE_ENV: Mode;
        MONGODB_URI: string,
        PORT: Number,
        MONGODB_URI_LOCAL: string,
        SESSION_SECRET: string
    } 
}