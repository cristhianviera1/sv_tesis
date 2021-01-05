import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './modules/app.module';
import express from 'express';
import dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this
// is likely due to a compressed response (e.g. gzip) which has not
// been handled correctly by aws-serverless-express and/or API
// Gateway. Add the necessary MIME types to binaryMimeTypes below
const binaryMimeTypes: string[] = [];

let cachedServer: Server;
const expressApp = express();

// Create the Nest.js server and convert it into an Express.js server
async function bootstrapServer(): Promise<Server> {
    if (cachedServer) {
        return cachedServer;
    }
    const nestApp = await NestFactory.create(AppModule, new
    ExpressAdapter(expressApp), {
        logger: ['error', 'warn'],
        cors: {
            origin: [
                /^(.*)/,
            ],
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            preflightContinue: false,
            optionsSuccessStatus: 200,
            credentials: true,
            allowedHeaders:
              'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for',
            maxAge: 1800,
        },
    });
    nestApp.use(eventContext());
    nestApp.use(bodyParser.json({ limit: '50mb' }));
    nestApp.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    await nestApp.init();
    return createServer(expressApp, undefined,
      binaryMimeTypes);

}

// Export the handler : the entry point of the Lambda function
export const handler = async (event: any, context: any) => {
    dotenv.config();
    cachedServer = await bootstrapServer();
    return proxy(cachedServer, event, context, 'PROMISE').promise;
};
