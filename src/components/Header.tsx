import React, { ReactChild } from "react";

import styles from "./Header.module.scss";

export interface IHeaderProps
{
    title: ReactChild;
    subtitle: ReactChild;
}

function Header({ title, subtitle }: IHeaderProps): JSX.Element
{
    return (
        <header className={ styles.root }>
            <h1>{ title }</h1>
            <p>{ subtitle }</p>
        </header>
    );
}

export default Header;
