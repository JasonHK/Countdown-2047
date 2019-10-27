"use strict";

export function getErrorMessage(error: unknown, defaults?: string): string
{
    if (error instanceof Error)
    {
        const message: string = ((typeof error.message === "string") && (error.message.trim().length !== 0)) ? error.message : "An unexpected error has occurred";
        return `${ error.name }: ${ message }`;
    }
    else
    {
        return "An unexpected error has occurred";
    }
}
