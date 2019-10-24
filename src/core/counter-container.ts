"use strict";

import { isHTMLElement } from "../utilities/is-html-element";

export class CounterContainer
{
    private readonly _unitContainer: HTMLElement;
    private readonly _valueContainer: HTMLElement;

    constructor(selector: string)
    {
        const element: Element = document.querySelector(selector);
        if (isHTMLElement(element))
        {
            const valueContainer = element.querySelector("span");
            const unitContainer = element.querySelector("figcaption");

            if (isHTMLElement(valueContainer) && isHTMLElement(unitContainer))
            {
                this._valueContainer = valueContainer;
                this._unitContainer = unitContainer;
            }
            else
            {
                throw new Error("Unable to find the value container and/or the unit container");
            }
        }
        else
        {
            throw new Error("Unable to find matching element with the given selector");
        }
    }

    public get unit(): string { return this._unitContainer.innerText; }
    public set unit(unit: string)
    {
        if (unit.trim().toLowerCase() !== this.unit.toLowerCase()) { this._unitContainer.innerText = unit; }
    }

    public get value(): number { return Number(this._valueContainer.innerText); }
    public set value(value: number)
    {
        if (value !== this.value) { this._valueContainer.innerText = value.toString(); }
    }
}
