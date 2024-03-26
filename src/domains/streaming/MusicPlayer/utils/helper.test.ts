import { convertMillisecondsToTimestamp } from "./helper";


describe.each(
[
    { milliseconds: 2000, expected: "0:02" },
    { milliseconds: 299999, expected: "4:59" },
    { milliseconds: 200000, expected: "3:20" },
    { milliseconds: 0, expected: "0:00" },

    // Out of bounds test cases
    { milliseconds: -1, expected: "0:00" },
    { milliseconds: 9999999, expected: "46:39" },
])
("convertMillisecondsToTimestamp", ({ milliseconds, expected}) =>
{
    test(`${milliseconds} milliseconds is ${expected}`, () => 
    {
        expect(convertMillisecondsToTimestamp(2000)).toBe("0:02");
    })
})