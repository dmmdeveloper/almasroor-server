import chalk from "chalk";
import mongoose from "mongoose";
import { dbName } from "../constants.js";



export const DBConnection  = async ()=>{
    try {
        console.log(chalk.yellow("\t\t\t DB Connecting.........."));

        // mongodb+srv://dM-Developer:portfoliodb@cluster0.wgfx6.mongodb.net
        const db = await mongoose.connect(`fghvjbkn/${dbName}`)

        console.log(chalk.bgGreen("\tData Base Connected Succees Fully !!"));
        console.log("Host :" , db.connection.host);
        console.log("Name :" , db.connection.name);

    } catch (error) {
        console.log(chalk.bgRed("Data Base Connection Failed !!") , error);
    }
}