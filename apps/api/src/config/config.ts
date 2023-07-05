import * as process from "process";
import {registerAs} from "@nestjs/config";

export enum VariablesEntorno
{
    puerto = 'config.port',
    urlDB = 'config.uriMongo',
    palabraJwt = 'config.palabraSecreta'
}

export default registerAs('config', () =>
    ({
        port: parseInt(process.env.PORT, 10) || 3000,
        uriMongo: process.env.URI_MONGO,
        palabraSecreta: process.env.PALABRA_SECRETA
    }));
