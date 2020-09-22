"use strict";

import {
    Theme,
    Typography,
    TypographyProps,
    makeStyles,
} from "@material-ui/core";
import {
    StyledComponentProps,
    Styles,
} from "@material-ui/styles";
import clsx from "clsx";
import React from "react";

const styles: Styles<Theme, IHeartProps, IHeartClassKey> = (theme) =>
{
    return {
        root: {
            lineHeight: "0.8em",
            fontFamily: `"Segoe UI Symbol", sans-serif`,
            fontSize: "1.25em",
        },
        color: {
            color: ({ customColor }) => { return customColor; },
        },
    };
};

const useStyles = makeStyles(styles, { name: "Heart" });

export function Heart(props: IHeartProps): JSX.Element
{
    const { className, customColor, ...others } = props;
    
    const classes = useStyles(props);

    return (
        <Typography
            className={ clsx(classes.root, classes.color, className) }
            { ...others }
            component="span"
        >
            &#10084;
        </Typography>
    );
}

export type IHeartClassKey =
    | "root"
    | "color";

export interface IHeartProps extends Omit<TypographyProps, ITypographyPropsExcluded>, StyledComponentProps<IHeartClassKey>
{
    customColor?: string;
}

type ITypographyPropsExcluded =
    | "align"
    | "classes"
    | "component"
    | "display"
    | "gutterBottom"
    | "paragraph"
    | "variant"
    | "variantMapping";
