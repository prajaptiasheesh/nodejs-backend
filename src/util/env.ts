import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";


if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    logger.debug("Using .env.development file to supply config environment variables");
    dotenv.config({ path: ".env.development" });  // you can delete this after you create your own .env file!
}