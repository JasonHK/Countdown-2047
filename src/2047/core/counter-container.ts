"use strict";

import { isHTMLElement } from "../utilities/is-html-element";

export class CounterContainer
{
    private readonly _unitContainer: HTMLElement;
    private readonly _valueContainer: HTMLElement;

    public get unit(): string { return this.getUnit(); }
    public set unit(unit: string) { this.setUnit(unit); }

    public get unitContainer(): HTMLElement { return this._unitContainer; }

    public get value(): number { return this.getValue(); }
    public set value(value: number) { this.setValue(value); }

    public get valueContainer(): HTMLElement { return this._valueContainer; }

    public constructor(selector: string)
    {
        const element = document.querySelector(selector);
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

    public getUnit(): string
    {
        return this._unitContainer.innerText;
    }

    public getValue(): number
    {
        return Number.parseInt(this._valueContainer.innerText);
    }

    public setUnit(unit: string): void
    {
        if (unit.trim() !== this.unit.trim())
        {
            this._unitContainer.innerText = unit;
        }
    }

    public setValue(value: number): void
    {
        if (value !== this.getValue())
        {
            this._valueContainer.innerText = value.toString();
        }
    }
}
