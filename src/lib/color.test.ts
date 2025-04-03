import { describe, it } from "@jest/globals";
import assert from "node:assert";
import { decodeColor } from "./color";
  
describe("Decode color", () => {
  it("Decodes black", () => {
    const actual = decodeColor(0);
    assert.strictEqual(actual, "black");
  });

  it("Decodes white", () => {
    const actual = decodeColor(1);
    assert.strictEqual(actual, "white");
  });

  it("Decodes light gray", () => {
    const actual = decodeColor(2);
    assert.strictEqual(actual, "lightgray");
  });
});
