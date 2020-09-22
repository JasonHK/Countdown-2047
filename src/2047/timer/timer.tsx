"use strict";

import React, { Fragment } from "react";

import { TimeSlot } from "./time-slot";

export function Timer(_: ITimerProps): JSX.Element
{
    return (
        <Fragment>
            <section>
                <TimeSlot label="YEARS" />
                <TimeSlot label="MONTHS" />
                <TimeSlot label="DAYS" />
            </section>
            <section>
                <TimeSlot label="HOURS" />
                <TimeSlot label="MINUTES" />
                <TimeSlot label="SECONDS" />
            </section>
        </Fragment>
    );
}

export interface ITimerProps {}
