"use strict";

import { LoggerBadge } from "./badges/logger-badge";

import { fromCache } from "./core/from-cache";
import { fromNetwork } from "./core/from-network";
import { precache } from "./core/precache";
import { updateCache } from "./core/update-cache";

import { getErrorMessage } from "./utilities/get-error-message";
import { isSameScope } from "./utilities/is-same-scope";

export async function fetchResponse(request: Request): Promise<Response>
{
    try
    {
        const response: Response = await fromNetwork(request, 1000);
        await updateCache(request, response.clone());

        return response;
    }
    catch
    {
        try
        {
            if (isSameScope(request.url))
            {
                return fromCache(request)
                    .catch((error) => {
                        console.error(...LoggerBadge, getErrorMessage(error));
                        return undefined;
                    });
            }
        }
        catch (error)
        {
            console.error(...LoggerBadge, getErrorMessage(error));
        }
    }

    return undefined;
}
