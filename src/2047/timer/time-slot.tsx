"use strict";

import React, { ReactNode } from "react";

export function TimeSlot(props: ITimeSlotProps): JSX.Element
{
    const { label, value } = props;

    return (
        <figure>
            <span>
                { value?.toString().padStart(2, "0") ?? "-" }
            </span>
            <figcaption>
                { label }
            </figcaption>
        </figure>
    );
}

export interface ITimeSlotProps
{
    label: ReactNode;
    value?: number;
}
