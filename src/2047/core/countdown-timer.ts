"use strict";

import Moment from "moment-mini";

export class CountdownTimer
{
    private readonly _expiry: Moment.Moment;

    public get expiry(): Moment.Moment { return this._expiry; }

    constructor(expiry: Moment.Moment)
    {
        this._expiry = expiry;
    }

    public getDuration(moment?: Moment.Moment): Moment.Duration
    {
        moment = Moment.isMoment(moment) ? moment : Moment();
        return Moment.duration(moment.isBefore(this._expiry) ? this._expiry.diff(moment) : 0);
    }
}
