"use strict";

import Moment, { Duration, Moment as MomentInstance } from "moment-mini";

export class CountdownTimer
{
    private readonly _expiry: MomentInstance;

    constructor(expiry: MomentInstance)
    {
        this._expiry = expiry;
    }

    public getDuration(moment?: MomentInstance): Duration
    {
        moment = Moment.isMoment(moment) ? moment : Moment();
        return Moment.duration(moment.isBefore(this._expiry) ? this._expiry.diff(moment) : 0);
    }
}
