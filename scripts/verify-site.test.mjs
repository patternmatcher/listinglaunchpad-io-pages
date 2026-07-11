import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("uses the public config contract and safe checkout route", () => {
  assert.match(html, /PUBLIC_CONFIG_URL=APP_BASE_URL\+"\/api\/public-config"/);
  assert.match(html, /CHECKOUT_URL=APP_BASE_URL\+"\/start"/);
  assert.doesNotMatch(html, /CHECKOUT_URL=.*\/setup/);
  assert.match(html, /checkout\.pathname!=="\/start"/);
});

test("keeps the production pricing fallback", () => {
  assert.match(html, /GBP:\{symbol:"£",base:335,seat:35\}/);
  assert.match(html, /CURRENCIES\.GBP\.base=config\.basePrice/);
  assert.match(html, /CURRENCIES\.GBP\.seat=config\.extraSeatPrice/);
  assert.match(html, /const CUR_ORDER=\["GBP"\]/);
  assert.match(html, /CUR_ORDER\.includes\(s\)/);
});

test("contains the customer entry points", () => {
  assert.match(html, /id="socialCta"/);
  assert.match(html, /id="contactActions"/);
  assert.match(html, /href="tel:\+447791258387"/);
  assert.match(html, /href="privacy\.html"/);
  assert.match(html, /href="terms\.html"/);
  assert.match(html, /id="pricing"/);
});
