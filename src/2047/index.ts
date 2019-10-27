"use strict";

import Moment, { Duration } from "moment-mini";
import SnackBar from "node-snackbar";

import { COUNTER_SELECTORS, ELEMENT_SELECTORS, EXPIRY_TIME, MESSAGE_RECORDS, SUBTITLE_RECORDS } from "./constants";

import { CountdownTimer } from "./core/countdown-timer";
import { CounterContainer } from "./core/counter-container";
import { TimerContainer } from "./core/timer-container";

import { ServiceWorkerEvent } from "./interfaces/service-worker-event";

import { getServiceWorker } from "./utilities/get-service-worker";
import { isCountdownEnded } from "./utilities/is-countdown-ended";
import { updateInnerHTML } from "./utilities/update-inner-html";
import { updateInnerText } from "./utilities/update-inner-text";

const subtitle: HTMLElement = document.querySelector<HTMLElement>(ELEMENT_SELECTORS.SUBTITLE);
const message: HTMLElement = document.querySelector<HTMLElement>(ELEMENT_SELECTORS.MESSAGE);

const container: TimerContainer = new TimerContainer.Builder()
    .setYears(new CounterContainer(COUNTER_SELECTORS.YEARS))
    .setMonths(new CounterContainer(COUNTER_SELECTORS.MONTHS))
    .setDays(new CounterContainer(COUNTER_SELECTORS.DAYS))
    .setHours(new CounterContainer(COUNTER_SELECTORS.HOURS))
    .setMinutes(new CounterContainer(COUNTER_SELECTORS.MINUTES))
    .setSeconds(new CounterContainer(COUNTER_SELECTORS.SECONDS))
    .build();

const countdown: CountdownTimer = new CountdownTimer(Moment(EXPIRY_TIME));

let duration: Duration = countdown.getDuration();
container.updateTimer(duration);

if (isCountdownEnded(duration))
{
    invadedByChiNazi();
}
else
{
    const interval: number = window.setInterval(() => {
        duration = countdown.getDuration();
        container.updateTimer(duration);
    
        if (isCountdownEnded(duration))
        {
            window.clearInterval(interval);
            invadedByChiNazi();
        }
        else if (duration.years() < 1)
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
    }, 1000);
}

function invadedByChiNazi(): void
{
    document.body.classList.add("chinazi");

    updateInnerText(subtitle, SUBTITLE_RECORDS.VANISHED);
    updateInnerText(message, MESSAGE_RECORDS.VANISHED);
}

if (Reflect.has(navigator, "serviceWorker"))
{
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./worker.js", { scope: "./" })
            .then((registration) => {
                const worker: ServiceWorker = getServiceWorker(registration);
                if (worker)
                {
                    worker.addEventListener("statechange", (event: ServiceWorkerEvent) => {
                        if (event.target.state === "installed")
                        {
                            SnackBar.show({
                                duration: 10000,
                                pos: "bottom-right",
                                text: "The application is ready for use offline.",
                                showAction: true,
                                actionTextColor: "#FC9402",
                            });
                        }
                    });
                }
            });
    });
}
