
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