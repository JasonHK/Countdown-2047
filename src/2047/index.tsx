"use strict";

import Moment from "moment-mini";
import SnackBar from "node-snackbar";
import * as WorkboxWindow from "workbox-window";

import { COUNTER_SELECTORS, ELEMENT_SELECTORS, EXPIRY_TIME, MESSAGE_RECORDS, SUBTITLE_RECORDS } from "./constants";

import { CounterContainer } from "./core/counter-container";
import { TimerContainer } from "./core/timer-container";

import { isCountdownEnded } from "./utilities/is-countdown-ended";
import { updateInnerHTML } from "./utilities/update-inner-html";
import { updateInnerText } from "./utilities/update-inner-text";

import { CountdownTimer } from "./timer/countdown-timer";

const subtitle = document.querySelector<HTMLElement>(ELEMENT_SELECTORS.SUBTITLE);
const message = document.querySelector<HTMLElement>(ELEMENT_SELECTORS.MESSAGE);

const container = new TimerContainer(
    {
        days: new CounterContainer(COUNTER_SELECTORS.DAYS),
        hours: new CounterContainer(COUNTER_SELECTORS.HOURS),
        minutes: new CounterContainer(COUNTER_SELECTORS.MINUTES),
        months: new CounterContainer(COUNTER_SELECTORS.MONTHS),
        seconds: new CounterContainer(COUNTER_SELECTORS.SECONDS),
        years: new CounterContainer(COUNTER_SELECTORS.YEARS),
    });

const countdown = new CountdownTimer(Moment(EXPIRY_TIME))
    .on("tick", updateTimer)
    .start();

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
                        showAction: false,
                        actionTextColor: "#FC9402",
                    });
            }
        });

    workbox.register();
}

function awSeriously(): void
{
    document.body.classList.add("aw-seriously");

    updateInnerText(subtitle!, SUBTITLE_RECORDS.VANISHED);
    updateInnerText(message!, MESSAGE_RECORDS.VANISHED);
}

function updateTimer(duration: Moment.Duration): void
{
    container.updateTimer(duration);

    if (isCountdownEnded(duration))
    {
        awSeriously();
    }
    else
    {
        if (duration.years() < 1)
        {
            updateInnerText(subtitle!, SUBTITLE_RECORDS.ONE_YEAR_LEFT);
        }
        else if (duration.years() < 5)
        {
            updateInnerText(subtitle!, SUBTITLE_RECORDS.FIVE_YEARS_LEFT);
        }
        else if (duration.years() < 10)
        {
            updateInnerText(subtitle!, SUBTITLE_RECORDS.TEN_YEARS_LEFT);
        }
    }
}
