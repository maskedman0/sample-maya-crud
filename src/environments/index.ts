import { config } from "dotenv";
config();

export const environment = {
   production: false,
   MONGO_URI: process.env.MONGO_URI || "",
};
