"use strict";

import {
    CssBaseline,
    Theme,
    createStyles,
    makeStyles,
} from "@material-ui/core";
import type { WithStyles } from "@material-ui/styles";
import { Moment as MomentInstance } from "moment-mini";
import React, { Fragment } from "react";

import { ExternalLink } from "./elements/external-link";
import { Heart } from "./elements/heart";

import { Footer } from "./layout/footer";
import { Header } from "./layout/header";

import { TimeSlot } from "./timer/time-slot";

const styles = (theme: Theme) =>
{
    return createStyles(
        {
            "@global": {
                "body": {
                    padding: theme.spacing(0, 1),
                },
            },
            root: {
                display: "flex",
                height: "100%",
                minHeight: "available",
                flexDirection: "column",
                justifyContent: "space-between",
            },
        });
};

const useStyles = makeStyles(styles);

export function Countdown(props: ICountdownProps): JSX.Element
{
    const classes = useStyles(props);

    return (
        <Fragment>
            <CssBaseline />
            <div id="app" className={ classes.root }>
                <Header
                    title="COUNTDOWN 2047"
                    subtitle="The Day When Hong Kong Totally Vanished"
                />
                <main>
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
                </main>
                <Footer>
                    Made with <Heart customColor="#E53E3E" aria-label="love" /> by <ExternalLink href="https://github.jasonhk.dev/">Jason Kwok</ExternalLink>.
                    Wish the <ExternalLink href="https://www.youtube.com/watch?v=jXZNOecZreY">glory</ExternalLink> belongs to Hong Kong.
                </Footer>
            </div>
        </Fragment>
    );
}

export interface ICountdownProps extends Partial<WithStyles<typeof styles>>
{
    expiry: MomentInstance;
}
