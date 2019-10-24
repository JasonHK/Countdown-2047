"use strict";

export function updateInnerHTML(element: HTMLElement, html: string): void
{
    if (html.trim() !== element.innerHTML.trim()) { element.innerHTML = html; }
}
