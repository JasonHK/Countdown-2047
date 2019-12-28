"use strict";

export class NoCacheError extends Error
{
    public get name(): string { return "NoCacheError"; }
}
