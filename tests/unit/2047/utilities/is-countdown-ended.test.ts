"use strict";

import { isCountdownEnded } from "src/2047/utilities/is-countdown-ended";

import Moment from "moment-mini";

describe(
    "isCountdownEnded(duration: Duration): boolean",
    () =>
    {
        executeTest(
            true,
            [
                [0.999, "s"],
                [0, "s"],
                [-1, "s"],
                [-2, "s"],
            ]);

        executeTest(
            false,
            [
                [2, "s"],
                [1, "s"],
            ]);
    });

function executeTest(expected: boolean, durations: TestCase[]): void
{
    it(
        `should return ${ String(expected) }`,
        () =>
        {
            for (const duration of durations)
            {
                expect(isCountdownEnded(Moment.duration(...duration)))
                    .toBe(expected);
            }
        });
}

type TestCase = [Moment.DurationInputArg1, Moment.DurationInputArg2?];
