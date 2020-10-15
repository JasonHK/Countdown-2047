import NextI18Next from "next-i18next";
import Path from "path";

const I18Next = new NextI18Next(
    {
        defaultNS: "_common",
        ns: [
            "_common",
            "_app",
            "index",
        ],
        defaultLanguage: "en-GB",
        otherLanguages: [
            "zh-HK",
        ],
        localePath: Path.resolve("./public/static/locales"),
    });

export const {
    Link,
    Router,
    Trans,
    appWithTranslation,
    config,
    i18n,
    initPromise,
    useTranslation,
    withTranslation,
} = I18Next;

export default I18Next;
