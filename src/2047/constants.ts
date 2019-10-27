"use strict";

import Moment from "moment-mini";

export const EXPIRY_TIME = "2047-07-01T00:00:00.000+08:00";
//export const EXPIRY_TIME = Moment().add(15, "seconds").toISOString();

export const enum ELEMENT_SELECTORS
{
    MESSAGE = "#message",
    SUBTITLE = "#subtitle",
}

export const enum COUNTER_SELECTORS
{
    DAYS = "#days",
    HOURS = "#hours",
    MINUTES = "#minutes",
    MONTHS = "#months",
    SECONDS = "#seconds",
    YEARS = "#years",
}

export const enum SUBTITLE_RECORDS
{
    ORIGINAL = "The Day When Hong Kong Totally Vanished",
    TEN_YEARS_LEFT = "That Day is Coming",
    FIVE_YEARS_LEFT = "That Day is Coming, Super Fast",
    ONE_YEAR_LEFT = "Please Take Action as Soon as Possible",
    VANISHED = "That Day Had Already Passed Away",
}

export const enum MESSAGE_RECORDS
{
    ORIGINAL = "Wish the <a href=\"https://www.youtube.com/watch?v=jXZNOecZreY\" target=\"_blank\" rel=\"noopener\">glory</a> belongs to Hong Kong.",
    VANISHED = "Please tell me if Hong Kong is not yet vanished.",
}
