"use strict";

import {
    BoundClass,
    BoundMethod,
} from "@aloreljs/bound-decorator";
import EventEmitter from "eventemitter3";
import Moment, {
    Duration,
    Moment as MomentInstance,
} from "moment-mini";

@BoundClass()
export class CountdownTimer extends EventEmitter<ICountdownTimerEventsMap>
{
    private readonly _expiry: MomentInstance;
    private _timeoutID: number | NodeJS.Timeout | null = null;

    public get expiry(): MomentInstance { return this._expiry.clone(); }

    public constructor(expiry: MomentInstance)
    {
        super();
        this._expiry = expiry;
    }

    public getDuration(moment?: MomentInstance): Duration
    {
        moment = moment ?? Moment();
        return Moment.duration(moment.isBefore(this._expiry) ? this._expiry.diff(moment) : 0);
    }

    public start(): this
    {
        this._onTick();
        return this;
    }

    private _getNextTickTimeout(): number
    {
        return this.getDuration().milliseconds() + 100;
    }

    @BoundMethod()
    private _onTick(): void
    {
        this.emit("tick", this.getDuration(), this);
        this._timeoutID = setTimeout(this._onTick, this._getNextTickTimeout());
    }
}

export interface ICountdownTimerEventsMap
{
    tick: [Duration, CountdownTimer];
}
