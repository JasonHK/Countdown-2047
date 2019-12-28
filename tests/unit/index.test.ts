"use strict";

import "intern";

const { suite, test } = intern.getPlugin("interface.tdd");
const { assert } = intern.getPlugin("chai");

suite(
    "A",
    () => { test("a", () => { assert.isTrue(true); }); });
