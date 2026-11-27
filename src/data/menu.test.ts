import { describe, expect, it } from "vitest";
import { dict, langs } from "@/i18n/dict";
import { menu } from "./menu";

describe("localized menu", () => {
  it.each(langs)("provides a name for every drink in %s", (lang) => {
    for (const item of menu) {
      expect(dict[lang].menu.items[item.id]).toBeTruthy();
      expect(dict[lang].menu.items[item.id]).not.toContain(" / ");
    }
  });

  it("localizes the beer and wine names and entertainment label", () => {
    expect(dict.hu.menu.items.draft).toBe("Csapolt sör");
    expect(dict.hu.menu.items.wine).toBe("Bor");
    expect(dict.en.menu.items.draft).toBe("Draft beer");
    expect(dict.en.menu.items.wine).toBe("Wine");
    expect(dict.hu.event.kicker).toBe("Szórakozás");
  });
});
