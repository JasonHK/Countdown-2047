import React from "react";

import styles from "./Footer.module.scss";

function Footer(): JSX.Element
{
    return (
        <footer className={ styles.root }>
            <p>
                Made with <Heart /> by <a href="https://github.jasonhk.dev/" target="_blank" rel="noreferrer noopener">Jason Kwok</a>.
            </p>
            { " " }
            <p>
                Wish the <a href="https://www.youtube.com/watch?v=jXZNOecZreY" target="_blank" rel="noreferrer noopener">glory</a> belongs to Hong Kong.
            </p>
        </footer>
    );
}

function Heart(): JSX.Element
{
    return <span className={ styles.heart }>&#10084;</span>;
}

export default Footer;
