"use strict";

export function isHTMLElement(payload: unknown): payload is HTMLElement
{
    return (typeof payload === "object") && (payload instanceof HTMLElement);
}
