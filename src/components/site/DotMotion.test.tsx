import { cleanup, render, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CoffeeBeanOrbit } from "./DotMotion";
import { DrinkIllustration } from "./DrinkIllustration";

beforeEach(() => sessionStorage.clear());
afterEach(cleanup);

describe("DOT illustration motion", () => {
  it("renders both bean layers and dismisses them without blocking the page", () => {
    const { container } = render(<><CoffeeBeanOrbit/><CoffeeBeanOrbit foreground/></>);
    expect(container.querySelectorAll(".dot-bean")).toHaveLength(10);
    expect(sessionStorage.getItem("dot-beans-seen")).toBe("1");
    fireEvent.keyDown(window, { key: "Escape" });
    expect(container.querySelectorAll(".dot-bean")).toHaveLength(0);
  });

  it("does not replay the bean introduction within the same session", () => {
    sessionStorage.setItem("dot-beans-seen", "1");
    const { container } = render(<CoffeeBeanOrbit/>);
    expect(container.querySelector(".dot-bean")).toBeNull();
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
