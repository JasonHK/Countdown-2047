"use strict";

import { updateInnerText } from "src/2047/utilities/update-inner-text";

describe(
    "updateInnerText(element: HTMLElement, text: string): void",
    () =>
    {
        executeUpdateInnerTextTest(
            "it should update the innerText of the element",
            [
                {
                    original: "",
                    update: "",
                    expected: "",
                },
                {
                    original: "",
                    update: "Hello, world!",
                    expected: "Hello, world!",
                },
                {
                    original: "",
                    update: "    Hello, world!    ",
                    expected: "    Hello, world!    ",
                },
                {
                    original: "    Hello, world!    ",
                    update: "Hello, world!",
                    expected: "    Hello, world!    ",
                },
                {
                    original: "Hello, world!",
                    update: "    Hello, world!    ",
                    expected: "Hello, world!",
                },
                {
                    original: "Hello, world!",
                    update: "The quick brown fox jumps over the lazy dog.",
                    expected: "The quick brown fox jumps over the lazy dog.",
                }
            ]);
    });

function executeUpdateInnerTextTest(name: string, testCases: TestCase.updateInnerText[]): void
{
    it(
        name,
        () =>
        {
            for (const testCase of testCases)
            {
                const container = document.createElement("div");
                container.innerText = testCase.original;

                updateInnerText(container, testCase.update);

                expect(container.innerText)
                    .toBe(testCase.expected);
            }
        });
}

namespace TestCase
{
    export interface updateInnerText
    {
        original: string;
        update: string;
        expected: string;
    }
}
