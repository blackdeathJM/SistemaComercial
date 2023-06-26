import * as process from "process";
import {registerAs} from "@nestjs/config";

export default registerAs('config', () =>
    ({
        port: parseInt(process.env.PORT, 10) || 3000,
        portFront: parseInt(process.env.PORT_FRONT),
        uriMongo: process.env.URI_MONGO,
        palabraSecreta: process.env.PALABRA_SECRETA,
        nixPacksBuildCmd: process.env.NIXPACKS_BUILD_CMD,
        nixPacksStartCmd: process.env.NIXPACKS_START_CMD,
        nodeOptions: process.env.NODE_OPTIONS
    }))
