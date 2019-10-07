"use strict";

const COUNTDOWN_DATE = new Date("Jul 1, 2047 00:00:00 GMT+08").getTime();

const ELEMENT_SELECTORS = {
    Container: {
        Days: "#days",
        Hours: "#hours",
        Minutes: "#minutes",
        Seconds: "#seconds",
        Year: "#years",
    },
};

class CountdownContainer
{
    constructor(selector)
    {
        if (typeof selector !== "string") { throw new TypeError("\"selector\" is not a string"); }

        const element = document.querySelector(selector);
        if (element instanceof HTMLElement)
        {
            const valueContainer = element.querySelector("span");
            const unitContainer = element.querySelector("figcaption");

            if ((valueContainer instanceof HTMLElement) && (unitContainer instanceof HTMLElement))
            {
                this._ValueContainer = valueContainer;
                this._UnitContainer = unitContainer;
            }
            else
            {
                throw new Error("Unable to find the value container and/or the unit container");
            }
        }
        else
        {
            throw new TypeError("Unable to find matching element with the given selector");
        }
    }

    get unit() { return this._UnitContainer.innerText; }
    set unit(unit)
    {
        if (typeof unit !== "string") { throw new TypeError("\"unit\" is not a string"); }
        if (unit.trim().toLowerCase() !== this.unit.toLowerCase()) { this._ValueContainer.innerText = unit; }
    }

    get value() { return Number(this._ValueContainer.innerText); }
    set value(value)
    {
        if (typeof value !== "number") { throw new TypeError("\"value\" is not a number"); }
        if (value !== this.value) { this._ValueContainer.innerText = value.toString(); }
    }
}

const yearsContainer = new CountdownContainer(ELEMENT_SELECTORS.Container.Year);
const daysContainer = new CountdownContainer(ELEMENT_SELECTORS.Container.Days);
const hoursContainer = new CountdownContainer(ELEMENT_SELECTORS.Container.Hours);
const minutesContainer = new CountdownContainer(ELEMENT_SELECTORS.Container.Minutes);
const secondsContainer = new CountdownContainer(ELEMENT_SELECTORS.Container.Seconds);

const countdown = setInterval(() => {
    let now = new Date().getTime();
    let distance = COUNTDOWN_DATE - now;

    let years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365.25));
    let days = Math.floor(distance % (1000 * 60 * 60 * 24 * 365.25) / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    yearsContainer.value = years;
    daysContainer.value = days;
    hoursContainer.value = hours;
    minutesContainer.value = minutes;
    secondsContainer.value = seconds;
}, 1000);
