"use strict";

import { CounterContainer } from "../core/counter-container";

export interface TimerContainerConfig
{
    days: CounterContainer;
    hours: CounterContainer;
    minutes: CounterContainer;
    months: CounterContainer;
    seconds: CounterContainer;
    years: CounterContainer;
}
