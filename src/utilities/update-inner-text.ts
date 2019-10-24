"use strict";

export function updateInnerText(element: HTMLElement, text: string): void
{
    if (text.trim() !== element.innerText.trim()) { element.innerText = text; }
}
