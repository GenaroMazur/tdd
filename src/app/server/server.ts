import { Application } from "express";
import { Server } from "http";
import { ServerExpressConfig } from "../interfaces/ServerExpressConfig";

export class ServerExpress extends Server {
    public app: Application
    public port?: number

    constructor(app: Application) {
        super(app)
        this.app = app
        ServerExpress._instance = this
    }

    private static _instance: ServerExpress
    public static get instance() { return this._instance }

    public setConfig(config: ServerExpressConfig = {}) {
        if (config.port)
            this.port = config.port

        return this
    }

    public start() {
        this.listen(this.port, () => {
            if (!this.port)
                this.port = (this.address() as any).port
            console.log(`Server listening on ${this.port}`)
        })

        return this
    }
}