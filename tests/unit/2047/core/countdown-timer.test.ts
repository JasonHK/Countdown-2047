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

        describe(
            "expiry: Moment.Moment",
            () =>
            {
                it(
                    "should return a Moment.Moment",
                    () =>
                    {
                        const moment = Moment();
                        const expiry = new CountdownTimer(moment).expiry;

                        expect(Moment.isMoment(expiry) && expiry.isSame(moment))
                            .toBe(true);
                    });
            });
    });
