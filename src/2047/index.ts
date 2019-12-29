"use strict";

import Moment from "moment-mini";
import SnackBar from "node-snackbar";
import * as WorkboxWindow from "workbox-window";

import { COUNTER_SELECTORS, ELEMENT_SELECTORS, EXPIRY_TIME, MESSAGE_RECORDS, SUBTITLE_RECORDS } from "./constants";

import { CountdownTimer } from "./core/countdown-timer";
import { CounterContainer } from "./core/counter-container";
import { TimerContainer } from "./core/timer-container";

import { isCountdownEnded } from "./utilities/is-countdown-ended";
import { updateInnerHTML } from "./utilities/update-inner-html";
import { updateInnerText } from "./utilities/update-inner-text";

const subtitle: HTMLElement = document.querySelector(ELEMENT_SELECTORS.SUBTITLE);
const message: HTMLElement = document.querySelector(ELEMENT_SELECTORS.MESSAGE);

const container = new TimerContainer(
    {
        days: new CounterContainer(COUNTER_SELECTORS.DAYS),
        hours: new CounterContainer(COUNTER_SELECTORS.HOURS),
        minutes: new CounterContainer(COUNTER_SELECTORS.MINUTES),
        months: new CounterContainer(COUNTER_SELECTORS.MONTHS),
        seconds: new CounterContainer(COUNTER_SELECTORS.SECONDS),
        years: new CounterContainer(COUNTER_SELECTORS.YEARS),
    });

const countdown = new CountdownTimer(Moment(EXPIRY_TIME));

updateTimer();

if (Reflect.has(navigator, "serviceWorker"))
{
    const workbox = new WorkboxWindow.Workbox(
        "./worker.js",
        {
            scope: "./",
        });

    workbox.addEventListener(
        "installed",
        (event) =>
        {
            if (event.isUpdate !== true)
            {
                SnackBar.show(
                    {
                        duration: 10000,
                        pos: "bottom-right",
                        text: "The application is ready for use offline.",
                        showAction: true,
                        actionTextColor: "#FC9402",
                    });
            }
        });

    workbox.register();
}

function invadedByChiNazi(): void
{
    document.body.classList.add("chinazi");

    updateInnerText(subtitle, SUBTITLE_RECORDS.VANISHED);
    updateInnerText(message, MESSAGE_RECORDS.VANISHED);
}

function updateTimer(): void
{
    const duration: Moment.Duration = countdown.getDuration();
    container.updateTimer(duration);

    if (isCountdownEnded(duration))
    {
        invadedByChiNazi();
    }
    else
    {
        const timeout: number = duration.milliseconds() + 100;
        window.setTimeout(updateTimer, timeout);

        if (duration.years() < 1)
        {
            updateInnerText(subtitle, SUBTITLE_RECORDS.ONE_YEAR_LEFT);
        }
        else if (duration.years() < 5)
        {
            updateInnerText(subtitle, SUBTITLE_RECORDS.FIVE_YEARS_LEFT);
        }
        else if (duration.years() < 10)
        {
            updateInnerText(subtitle, SUBTITLE_RECORDS.TEN_YEARS_LEFT);
        }
    }
}
