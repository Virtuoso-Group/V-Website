import { convertMillisecondsToTimestamp } from "./helper";


// TODO: To test this properly, 
// I should upload albums with tracks shorter than a minute to see if it looks good.
describe.each(
[
    // Less than a minute
    { milliseconds: -1,         expected: "0:00" },
    { milliseconds: 0,          expected: "0:00" },
    { milliseconds: 2000,       expected: "0:02" },


    // Minutes long
    { milliseconds: 200000,     expected: "3:20" },
    { milliseconds: 299999,     expected: "4:59" },
    
    
    // Hours long
    { milliseconds: 9999999,    expected: "2:46:39" },
    { milliseconds: 499280000,  expected: "138:41:20" },
    { milliseconds: 504000000,  expected: "140:00:00" },
])
("convertMillisecondsToTimestamp", ({ milliseconds, expected}) =>
{
    test(`${milliseconds} milliseconds is ${expected}`, () => 
    {
        expect(convertMillisecondsToTimestamp(milliseconds))
        .toBe(expected);
    })
})