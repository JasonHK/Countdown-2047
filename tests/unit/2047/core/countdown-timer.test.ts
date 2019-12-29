"use strict";

import { CountdownTimer } from "src/2047/core/countdown-timer";

import Moment from "moment-mini";

describe(
    "CountdownTimer",
    () =>
    {
        it(
            "should return a CountdownTimer",
            () =>
            {
                expect(new CountdownTimer(Moment()))
                    .toBeInstanceOf(CountdownTimer);
            });
    });
