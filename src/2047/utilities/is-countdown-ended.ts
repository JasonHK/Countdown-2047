"use strict";

import { Duration } from "moment-mini";

export function isCountdownEnded(duration: Duration): boolean
{
    return (duration.years() === 0)
        && (duration.months() === 0)
        && (duration.days() === 0)
        && (duration.hours() === 0)
        && (duration.minutes() === 0)
        && (duration.seconds() === 0);
}
