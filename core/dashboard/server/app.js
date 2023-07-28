import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import axios from 'axios';

import rateLimit from 'express-rate-limit';

import { readFileSync } from 'fs';

const commands = [
    "help",
    "restart",
    "shutdown",
    "version"
]

function startServer(serverAdminPassword) {
    const logger = global.modules.get('logger');
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(express.json());
    app.use(express.static(path.resolve('core/dashboard/public')));

    app.use(cors());
    app.use(helmet());

    app.use(rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100
    }));

    app.get('/', (req, res) => {
        res.sendFile(path.resolve('core/dashboard/public', 'index.html'));
    });

    app.get('/getConfig', (req, res) => {
        const config = global.config;
        return res.status(200).json({ config });
    });

    app.put('/commands', (req, res) => {
        const { command } = req.body;
        if (!command) return res.status(400).send('Bad Request');
        if (!commands.includes(command)) return res.status(400).send('Bad Request');

        let returnData = {};
        switch (command) {
            case "help":
                returnData = {
                    commands: commands
                }
                break;
            case "restart":
                global.restart();
                returnData = {
                    message: "Restarted"
                }
                break;
            case "shutdown":
                global.shutdown();
                returnData = {
                    message: "Shutdown"
                }
                break;
            case "version":
                returnData = {
                    version: JSON.parse(readFileSync(path.resolve('package.json'))).version
                }
                break;

            default:
                return res.status(400).send('Bad Request');
        }

        return res.status(200).json(returnData);
    });

    global.server = app.listen(port, () => {
        logger.system(getLang("build.start.serverStarted", { port, serverAdminPassword }));
    });

}

export default startServer;
