"use strict";

import {
    Theme,
    Typography,
    createStyles,
    makeStyles,
} from "@material-ui/core";
import type { WithStyles } from "@material-ui/styles";
import React, { PropsWithChildren } from "react";

const styles = (theme: Theme) =>
{
    return createStyles(
        {
            root: {
                marginTop: theme.spacing(2),
            },
        });
};

const useStyles = makeStyles(styles);

export function Footer(props: PropsWithChildren<IFooterProps>): JSX.Element
{
    const { children } = props;

    const classes = useStyles(props);

    return (
        <Typography
            className={ classes.root }
            paragraph
            align="center"
            color="textSecondary"
            component="footer"
        >
            { children }
        </Typography>
    );
}

export interface IFooterProps extends Partial<WithStyles<typeof styles>> {}
