import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { RealCoffeeBeans } from "./DotMotion";
import { DrinkIllustration } from "./DrinkIllustration";

beforeEach(() => sessionStorage.clear());
afterEach(cleanup);

describe("DOT illustration motion", () => {
  it("renders eight real photographic beans across both layers", () => {
    const { container } = render(<><RealCoffeeBeans/><RealCoffeeBeans foreground/></>);
    const photos = [...container.querySelectorAll<HTMLImageElement>("img.dot-bean")];
    expect(photos).toHaveLength(8);
    expect(photos.every(photo => photo.src.includes("Coffee_bean_transparent.png") && photo.alt === "")).toBe(true);
    expect(container.querySelector(".dot-bean-layer svg")).toBeNull();
    expect(sessionStorage.getItem("dot-beans-seen")).toBeNull();
  });

  it("renders the beans on every mount, even with an old session flag", () => {
    sessionStorage.setItem("dot-beans-seen", "1");
    const first = render(<RealCoffeeBeans/>);
    expect(first.container.querySelectorAll(".dot-bean")).toHaveLength(4);
    first.unmount();
    const refreshed = render(<RealCoffeeBeans/>);
    expect(refreshed.container.querySelectorAll(".dot-bean")).toHaveLength(4);
  });

  it.each(["beer", "cocktails", "wine"] as const)("renders two distinct glasses for %s", (category) => {
    const { container } = render(<DrinkIllustration category={category} label={category}/>);
    expect(container.querySelector(".dot-glass-left")).not.toBeNull();
    expect(container.querySelector(".dot-glass-right")).not.toBeNull();
    expect(container.querySelector(".dot-clink-spark")).not.toBeNull();
  });

  it("replaces the coffee steam with a lemon and ice when switching categories", () => {
    const { container, rerender } = render(<DrinkIllustration category="coffee" label="Coffee"/>);
    expect(container.querySelector(".dot-steam-once")).not.toBeNull();
    rerender(<DrinkIllustration category="soft" label="Soft drinks"/>);
    expect(container.querySelector(".dot-steam-once")).toBeNull();
    expect(container.querySelector(".dot-lemon")).not.toBeNull();
    expect(container.querySelector(".dot-ice")).not.toBeNull();
  });

  it("shows the all-category menu illustration without beverage-specific motion", () => {
    const { container } = render(<DrinkIllustration category="coffee" label="All" variant="menu"/>);
    expect(container.querySelector(".dot-cup-slide")).not.toBeNull();
    expect(container.querySelector(".dot-steam-once")).toBeNull();
  });
});
