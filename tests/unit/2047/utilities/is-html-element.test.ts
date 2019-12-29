"use strict";

import { isHTMLElement } from "src/2047/utilities/is-html-element";

namespace IS_HTML_ELEMENT
{
    export const VALID_TAG_NAMES: HTMLElementTagName[] = [
        "html",
        "head",
        "body",
        "div",
    ];
}

describe(
    "isHTMLElement(payload: unknown): payload is HTMLElement",
    () =>
    {
        const ValidHTMLElements = IS_HTML_ELEMENT.VALID_TAG_NAMES
            .map((name) => { return document.createElement(name); });

        executeIsHTMLElementTest(true, ValidHTMLElements);

        executeIsHTMLElementTest(
            false,
            [
                new Object(),
            ]);
    });
    
function executeIsHTMLElementTest(expected: boolean, testCases: TestCase.isHTMLElement[]): void
{
    it(
        `should return ${ String(expected) }`,
        () =>
        {
            for (const testCase of testCases)
            {
                expect(isHTMLElement(testCase))
                    .toBe(expected);
            }
        });
}

type HTMLElementTagName = keyof HTMLElementTagNameMap;

namespace TestCase
{
    export type isHTMLElement = unknown;
}
