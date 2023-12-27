import dotenv from "dotenv"
import express from "express"
import { ServerExpress } from "./server/server"
dotenv.config(require("./../../config/dotenv.config.js"))

new ServerExpress(express()).setConfig({"port":8080}).start()