import chalk from "chalk";
import mongoose from "mongoose";
import { dbName } from "../constants.js";



export const DBConnection  = async ()=>{
    try {
        console.log(chalk.yellow("\t\t\t DB Connecting.........."));

        const db = await mongoose.connect(`${process.env.DBuRL}/${dbName}`)

        console.log(chalk.bgGreen("\tData Base Connected Succees Fully !!"));
        console.log("Host :" , db.connection.host);
        console.log("Name :" , db.connection.name);

    } catch (error) {
        console.log(chalk.bgRed("Data Base Connection Failed !!") , error);
    }
}