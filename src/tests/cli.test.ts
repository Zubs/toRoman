import { spawnSync } from "child_process";
import path from "path";

const cli = path.resolve("cli.js");

const run = (...args: string[]) => {
    const result = spawnSync(process.execPath, [cli, ...args], { encoding: "utf8" });

    return {
        code: result.status,
        out: result.stdout.trim(),
        err: result.stderr.trim(),
    }
}


describe("cli", () => {
    const toRoman: [string, string][] = [
        ["1", "I"],
        ["5", "V"],
        ["14", "XIV"],
        ["3999", "MMMCMXCIX"],
    ];

    test.each(toRoman)("should print %s as %s", (input, expected) => {
        expect(run(input)).toEqual({
            code: 0,
            out: expected,
            err: ""
        });
    })

    const toNumber: [string, string][] = [
        ["V", "5"],
        ["XIV", "14"],
        ["xiv", "14"],
        ["MMMCMXCIX", "3999"],
    ];

    test.each(toNumber)("should print %s as %s", (input, expected) => {
        expect(run(input)).toEqual({ code: 0, out: expected, err: "" });
    });

    const failures: [string, string][] = [
        ["IIV", "Invalid Roman numeral: IIV"],
        ["MMMM", "Invalid Roman numeral: MMMM"],
        ["0", "Value cannot be up to 4000 or less than 0"],
        ["4000", "Value cannot be up to 4000 or less than 0"],
        ["3.5", "Value must be of type number"],
    ];

    test.each(failures)("should exit 1 with a message for %s", (input, message) => {
        expect(run(input)).toEqual({ code: 1, out: "", err: message });
    });

    test("should print usage and exit 1 when there is no argument", () => {
        expect(run()).toEqual({
            code: 1,
            out: "Usage: toroman <number|roman>",
            err: "",
        });
    });
})