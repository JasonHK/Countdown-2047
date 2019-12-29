"use strict";

import Moment from "moment-mini";

import { TimerContainerConfig } from "../interfaces/timer-container-config";

import { CounterContainer } from "./counter-container";

export class TimerContainer
{
    private readonly _days: CounterContainer;
    private readonly _hours: CounterContainer;
    private readonly _minutes: CounterContainer;
    private readonly _months: CounterContainer;
    private readonly _seconds: CounterContainer;
    private readonly _years: CounterContainer;

    constructor(config: TimerContainerConfig)
    {
        this._years = config.years;
        this._months = config.months;
        this._days = config.days;
        this._hours = config.hours;
        this._minutes = config.minutes;
        this._seconds = config.seconds;
    }

    public updateTimer(duration: Moment.Duration): void
    {
        this._years.value = duration.years();
        this._months.value = duration.months();
        this._days.value = duration.days();
        this._hours.value = duration.hours();
        this._minutes.value = duration.minutes();
        this._seconds.value = duration.seconds() + ((duration.milliseconds() === 0) ? 0 : 1);
    }
}
