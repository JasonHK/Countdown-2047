"use strict";

import {
    Theme,
    Typography,
    createStyles,
    makeStyles,
} from "@material-ui/core";
import type { WithStyles } from "@material-ui/styles";
import { Properties as CssProperties } from "csstype";
import { JssStyle } from "jss";
import React, { ReactNode } from "react";
import { createUseStyles } from "react-jss";

// const styles = (theme: Theme) =>
// {
//     return createStyles(
//         {
//             root: {
//                 margin: theme.spacing(3, 0, 1),
//                 textAlign: "center",
//             },
//         });
// };

const useStyles = createUseStyles(
    {
        root: {
            marginTop: "25px",
        } as JssStyle,
    });

export function Header(props: IHeaderProps): JSX.Element
{
    const { subtitle, title } = props;

    const classes = useStyles(props);

    return (
        <header>
            <h1>{ title }</h1>
            <h2>{ subtitle }</h2>
        </header>
    );
}

export interface IHeaderProps extends Partial<WithStyles<typeof styles>>
{
    title: ReactNode;
    subtitle: ReactNode;
}
