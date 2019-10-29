"use strict";

import { Duration } from "moment-mini";

import { CounterContainer } from "./counter-container";

export class TimerContainer
{
    private readonly _days: CounterContainer;
    private readonly _hours: CounterContainer;
    private readonly _minutes: CounterContainer;
    private readonly _months: CounterContainer;
    private readonly _seconds: CounterContainer;
    private readonly _years: CounterContainer;

    constructor(years: CounterContainer, months: CounterContainer, days: CounterContainer,
                hours: CounterContainer, minutes: CounterContainer, seconds: CounterContainer)
    {
        this._years = years;
        this._months = months;
        this._days = days;
        this._hours = hours;
        this._minutes = minutes;
        this._seconds = seconds;
    }

    public updateTimer(duration: Duration): void
    {
        this._years.value = duration.years();
        this._months.value = duration.months();
        this._days.value = duration.days();
        this._hours.value = duration.hours();
        this._minutes.value = duration.minutes();
        this._seconds.value = duration.seconds() + ((duration.milliseconds() === 0) ? 0 : 1);
    }
}

export namespace TimerContainer
{
    export class Builder
    {
        private _days: CounterContainer;
        private _hours: CounterContainer;
        private _minutes: CounterContainer;
        private _months: CounterContainer;
        private _seconds: CounterContainer;
        private _years: CounterContainer;

        public setDays(days: CounterContainer): Builder
        {
            this._days = days;
            return this;
        }

        public setHours(hours: CounterContainer): Builder
        {
            this._hours = hours;
            return this;
        }

        public setMinutes(minutes: CounterContainer): Builder
        {
            this._minutes = minutes;
            return this;
        }

        public setMonths(months: CounterContainer): Builder
        {
            this._months = months;
            return this;
        }

        public setSeconds(seconds: CounterContainer): Builder
        {
            this._seconds = seconds;
            return this;
        }

        public setYears(years: CounterContainer): Builder
        {
            this._years = years;
            return this;
        }

        public build(): TimerContainer
        {
            return new TimerContainer(this._years, this._months, this._days,
                                      this._hours, this._minutes, this._seconds);
        }
    }
}
