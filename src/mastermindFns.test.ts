import { checkCombo } from "./mastermindFns";

test("test checkCombo function", () => {
    expect(
        checkCombo(
            ["pink", "yellow", "blue", "green"],
            ["pink", "yellow", "blue", "green"]
        )
    ).toStrictEqual(["red", "red", "red", "red"]);
    expect(
        checkCombo(
            ["yellow", "pink", "green", "blue"],
            ["pink", "yellow", "blue", "green"]
        )
    ).toStrictEqual(["white", "white", "white", "white"]);
    expect(
        checkCombo(
            ["pink", "yellow", "green", "blue"],
            ["pink", "yellow", "blue", "green"]
        )
    ).toStrictEqual(["red", "red", "white", "white"]);
});
