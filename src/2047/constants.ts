"use strict";

import Moment from "moment-mini";

export const EXPIRY_TIME = "2047-07-01T00:00:00.000+08:00";
//export const EXPIRY_TIME = Moment().add(15, "seconds").toISOString();

export namespace ELEMENT_SELECTORS
{
    export const MESSAGE = "#message";
    export const SUBTITLE = "#subtitle";
}

export namespace COUNTER_SELECTORS
{
    export const DAYS = "#days";
    export const HOURS = "#hours";
    export const MINUTES = "#minutes";
    export const MONTHS = "#months";
    export const SECONDS = "#seconds";
    export const YEARS = "#years";
}

export namespace SUBTITLE_RECORDS
{
    export const ORIGINAL = "The Day When Hong Kong Totally Vanished";
    export const TEN_YEARS_LEFT = "That Day is Coming";
    export const FIVE_YEARS_LEFT = "That Day is Coming; Super Fast";
    export const ONE_YEAR_LEFT = "Please Take Action as Soon as Possible";
    export const VANISHED = "That Day Had Already Passed Away";
}

export namespace MESSAGE_RECORDS
{
    export const ORIGINAL = "Wish the <a href=\"https://www.youtube.com/watch?v=jXZNOecZreY\" target=\"_blank\" rel=\"noopener\">glory</a> belongs to Hong Kong.";
    export const VANISHED = "Please tell me if Hong Kong is not yet vanished.";
}
