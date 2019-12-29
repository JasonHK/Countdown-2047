"use strict";

import { CounterContainer } from "src/2047/core/counter-container";

const FIGURE_SELECTOR = "#figure";

let figcaption: HTMLElement;
let figure: HTMLElement;
let span: HTMLSpanElement;

beforeAll(
    () =>
    {
        figure = document.createElement("figure");
        figure.id = "figure";

        span = document.createElement("span");
        span.innerText = "-";

        figcaption = document.createElement("figcaption");
        figcaption.innerText = "SECONDS";

        figure.append(span, figcaption);
        document.body.append(figure);
    });

beforeEach(
    () =>
    {
        span.innerText = "-";
        figcaption.innerText = "SECONDS";
    });

afterAll(
    () =>
    {
        span.remove();
        span = null;

        figcaption.remove();
        figcaption = null;
        
        figure.remove();
        figure = null;
    });

describe(
    "CounterContainer",
    () =>
    {
        describe(
            "new CounterContainer(selector: string)",
            () =>
            {
                it(
                    "should return a CounterContainer",
                    () =>
                    {
                        expect(new CounterContainer(FIGURE_SELECTOR))
                            .toBeInstanceOf(CounterContainer);
                    });

                it(
                    "should throw an Error",
                    () =>
                    {
                        expect(() => { new CounterContainer("#non-exist"); })
                            .toThrowError("Unable to find matching element with the given selector");

                        let tmp = document.createElement("div");
                        tmp.id = "tmp";

                        document.body.append(tmp);
                        
                        expect(() => { new CounterContainer("#tmp"); })
                            .toThrowError("Unable to find the value container and/or the unit container");

                        tmp.remove();
                        tmp = null;
                    });
            });
    });
