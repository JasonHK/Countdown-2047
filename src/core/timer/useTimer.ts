import dayjs, { Dayjs } from "dayjs";
import { Duration } from "dayjs/plugin/duration";
import { useEffect, useRef, useState } from "react";

export interface ITimerSettings
{
    expiry: Dayjs;
    onExpire?: () => void;
}

export interface ITimerObject
{
    duration: IDurationObject;
    isExpired: boolean;
}

export interface IDurationObject
{
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

type ITimeout = number | NodeJS.Timeout;

function useTimer({ expiry, onExpire }: ITimerSettings): ITimerObject
{
    const [seconds, setSeconds] = useState<number>();
    const durationRef = useRef(getDuration(expiry));
    const timeoutRef = useRef<ITimeout>();

    function clearTimeoutRef(): void
    {
        if (timeoutRef.current)
        {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = undefined;
        }
    }

    function onTimeout(): void
    {
        const duration = getDuration(expiry);
        durationRef.current = duration;

        if (!isTimerExpired(duration))
        {
            timeoutRef.current = setTimeout(onTimeout, duration.milliseconds() + 250);
        }
        else
        {
            clearTimeoutRef();
            if (typeof onExpire === "function") { onExpire(); }
        }
        
        setSeconds(duration.asSeconds());
    }

    useEffect(
        () =>
        {
            onTimeout();
            return clearTimeoutRef;
        },
        []);

    const duration = durationRef.current;

    return {
        duration: toDurationObject(duration),
        isExpired: isTimerExpired(duration),
    };
}

function isTimerExpired(duration: Duration): boolean
{
    return (duration.asMilliseconds() <= 0);
}

function getDuration(expiry: Dayjs): Duration
{
    const current = dayjs();
    return dayjs.duration(current.isBefore(expiry) ? expiry.diff(current) : 0);
}

function toDurationObject(duration: Duration): IDurationObject
{
    if (duration.milliseconds() > 0)
    {
        duration = duration.add(1000 - duration.milliseconds(), "ms");
    }

    return {
        years: duration.years(),
        months: duration.months(),
        days: duration.days(),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
    };
}

declare global
{
    function clearTimeout(handle?: ITimeout): void;
}

export default useTimer;
