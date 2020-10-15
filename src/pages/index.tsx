import { GetStaticPropsResult } from "next/types";
import React, { Fragment } from "react";

import "@/core/_initialize/dayjs";

import { Trans, useTranslation } from "@/locales/I18Next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Timer from "@/components/Timer";

import EXPIRY_TIME from "@/core/EXPIRY_TIME";

function Index(): JSX.Element
{
    const { t } = useTranslation("index");

    return (
        <Fragment>
            <Header
                title={ t("heading.title") as string }
                subtitle="The Day When Hong Kong Totally Vanished"
            />
            <main>
                <Timer expiry={ EXPIRY_TIME } />
            </main>
            <Footer />
        </Fragment>
    );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<{}>>
{
    return {
        props: {},
        revalidate: 1,
    };
}

export default Index;
