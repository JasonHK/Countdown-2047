"use strict";

import { TimeoutError } from "../errors/timeout-error";

export function fromNetwork(request: Request, timeout: number): Promise<Response>
{
    return new Promise((resolve, reject) => {
        const fetchTimeout: number = self.setTimeout(() => { reject(new TimeoutError()) }, timeout);

        fetch(request)
            .then((response) => {
                clearTimeout(fetchTimeout);
                resolve(response);
            }, reject);
    });
}
