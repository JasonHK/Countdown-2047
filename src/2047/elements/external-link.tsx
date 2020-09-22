"use strict";

import {
    Link,
    LinkProps,
} from "@material-ui/core";
import React from "react";

export function ExternalLink(props: IExternalLinkProps): JSX.Element
{
    return (
        <Link target="_blank" { ...props } rel="noopener noreferrer" />
    );
}

export interface IExternalLinkProps extends Omit<LinkProps, ILinkPropsExcluded> {}

type ILinkPropsExcluded =
    | "component"
    | "rel";
