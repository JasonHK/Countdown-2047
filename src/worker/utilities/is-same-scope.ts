"use strict";

const scope: string = self.origin;

export function isSameScope(url: string): boolean
{
    return url.startsWith(scope);
}
