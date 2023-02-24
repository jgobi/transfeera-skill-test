/**
 * @param {import('./handlers').BasicHandlerSync} handler 
 * @returns {import('express').RequestHandler}
 */
export function basicHandlerSync(handler) {
    return function (req, res) {
        try {
            let payload = handler(req);
            res.send(payload || { status: 200 });
        } catch (err) {
            catchHandler(err, res);
        }
    }
}

/**
 * @param {import('./handlers').BasicHandler} handler 
 * @returns {import('express').RequestHandler}
 */
export function basicHandler(handler) {
    /** @type {import('express').RequestHandler} */
    return async function (req, res) {
        try {
            let payload = await handler(req);
            res.send(payload || { status: 200 });
        } catch (err) {
            catchHandler(err, res);
        }
    }
}

/**
 * 
 * @param {Error} err 
 * @param {import('express').Response} res 
 */
export function catchHandler(err, res) {
    if (err instanceof HTTPError){
        if (err.cause) {
            console.trace(err);
            console.trace(err.cause);
        }
        res.status(err.status).send(err.body);
    } else {
        console.trace(err);
        res.status(500).send({
            status: 500,
            errorMessage: "Unexpected server error, please try again later."
        });
    }
}

export class HTTPError extends Error {
    constructor(status, message, cause) {
        super(`A ${status} error occurred: ${message}`);
        this.status = status;
        this.body = {
            status,
            errorMessage: message,
        };
        this.cause = cause; 
    }
}
