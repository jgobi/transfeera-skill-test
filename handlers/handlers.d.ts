import express from 'express'
export type BasicHandlerSync = (res: express.Request) => any;
export type BasicHandler = (res: express.Request) => Promise<any>;
