"use strict";

import { CountdownTimer } from "src/2047/core/countdown-timer";

import Moment from "moment-mini";
import { mocked } from "ts-jest/utils";

const EXPIRY_TIME: Moment.Moment = Moment("2020-01-01T00:00:00.000Z");

namespace COUNTDOWN_TIMER
{
    export namespace GET_DURATION
    {
        export const TEST_CASES: TestCase.CountdownTimer.getDuration[] = [
            [
                Moment("2019-12-31T23:59:00.000Z"),
                Moment.duration(1, "minute"),
            ],
            [
                Moment("2019-12-31T23:59:59.000Z"),
                Moment.duration(1, "second"),
            ],
            [
                Moment("2019-12-31T23:59:59.999Z"),
                Moment.duration(1, "millisecond"),
            ],
            [
                Moment("2020-01-01T00:00:00.000Z"),
                Moment.duration(0, "milliseconds"),
            ],
            [
                Moment("2020-01-01T00:00:00.001Z"),
                Moment.duration(0, "milliseconds"),
            ],
        ];
    }
}

jest.mock(
    "moment-mini",
    () =>
    {
        const actual: typeof Moment = jest.requireActual("moment-mini");
        
        return Object.assign(
            jest.fn((...args) => { return actual(...args); }),
            actual);
    });

const MockedMoment = mocked(Moment);

let countdown: CountdownTimer;

beforeEach(
    () =>
    {
        countdown = new CountdownTimer(EXPIRY_TIME);
    });

afterEach(
    () =>
    {
        MockedMoment.mockClear();
    });

afterAll(
    () =>
    {
        countdown = null;

        MockedMoment.mockRestore();
    });

describe(
    "CountdownTimer",
    () =>
    {
        describe(
            "new CountdownTimer(expiry: Moment.Moment)",
            () =>
            {
                it(
                    "should return a CountdownTimer",
                    () =>
                    {
                        expect(countdown)
                            .toBeInstanceOf(CountdownTimer);
                    });
            });

        describe(
            "#expiry: Moment.Moment",
            () =>
            {
                it(
                    "should return a Moment.Moment",
                    () =>
                    {
                        const expiry = countdown.expiry;

                        expect(Moment.isMoment(expiry))
                            .toBe(true);
                        expect(expiry.valueOf())
                            .toBe(EXPIRY_TIME.valueOf());
                    });
            });

        describe(
            "#getDuration(moment?: Moment.Moment): Moment.Duration",
            () =>
            {
                describe(
                    "use the current time",
                    () =>
                    {
                        it(
                            "should return a Moment.Duration",
                            () =>
                            {
                                for (const testCase of COUNTDOWN_TIMER.GET_DURATION.TEST_CASES)
                                {
                                    MockedMoment.mockReturnValueOnce(testCase[0]);
                                    const duration = countdown.getDuration();

                                    expect(Moment.isDuration(duration))
                                        .toBe(true);
                                    expect(duration.asMilliseconds())
                                        .toBe(testCase[1].asMilliseconds());
                                }

                                expect(MockedMoment)
                                    .toBeCalledTimes(COUNTDOWN_TIMER.GET_DURATION.TEST_CASES.length);
                            });
                    });

                describe(
                    "use a specific time",
                    () =>
                    {
                        it(
                            "should return a Moment.Duration",
                            () =>
                            {
                                for (const testCase of COUNTDOWN_TIMER.GET_DURATION.TEST_CASES)
                                {
                                    const duration = countdown.getDuration(testCase[0]);

                                    expect(Moment.isDuration(duration))
                                        .toBe(true);
                                    expect(duration.asMilliseconds())
                                        .toBe(testCase[1].asMilliseconds());
                                }

                                expect(MockedMoment)
                                    .toBeCalledTimes(0);
                            });
                    });
            });
    });

namespace TestCase
{
    export namespace CountdownTimer
    {
        export type getDuration = [
            Moment.Moment,
            Moment.Duration,
        ];
    }
}
