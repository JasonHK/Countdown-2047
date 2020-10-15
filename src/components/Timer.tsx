import { Dayjs } from "dayjs";
import React, { ReactChild } from "react";
import useTimer from "../core/timer/useTimer";

import styles from "./Timer.module.scss";

export interface ITimerProps
{
    expiry: Dayjs;
}

function Timer({ expiry }: ITimerProps): JSX.Element
{
    const {
        duration: { years, months, days, hours, minutes, seconds },
    } = useTimer({ expiry });

    return (
        <div className={ styles.root }>
            <section>
                <TimerSegment unit="Years" value={ years } />
                <TimerSegment unit="Months" value={ months } />
                <TimerSegment unit="Days" value={ days } />
            </section>
            <section>
                <TimerSegment unit="Hours" value={ hours } />
                <TimerSegment unit="Minutes" value={ minutes } />
                <TimerSegment unit="Seconds" value={ seconds } />
            </section>
        </div>
    );
}

interface ITimerSegmentProps
{
    unit: ReactChild;
    value?: number;
}

function TimerSegment({ unit, value }: ITimerSegmentProps): JSX.Element
{
    return (
        <figure>
            <div>
                { value ?? "-" }
            </div>
            <figcaption>
                { unit }
            </figcaption>
        </figure>
    );
}

export default Timer;
