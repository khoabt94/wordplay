import express, { Express } from 'express';
import logger from 'morgan';
import cors from 'cors'


export default (app: Express) => {
    app.use(logger('dev'));
    // app.use(cookieParser());
    app.use(express.json());
    app.use(cors());
};