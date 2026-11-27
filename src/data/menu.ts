// Only drinks confirmed by public listings (Restaurant Guru review mentions, Visit Subotica).
// No prices are shown: none could be verified (only "RSD 1–500 per person" range).
export type MenuCategory = "coffee" | "beer" | "cocktails" | "wine" | "soft";
export type MenuItemId = "coffee" | "draft" | "cocktails" | "wine" | "sherry" | "lemonade";
export type MenuItem = { id: MenuItemId; category: MenuCategory; price?: number };

export const menuCategories: MenuCategory[] = ["coffee", "beer", "cocktails", "wine", "soft"];

export const menu: MenuItem[] = [
  { id: "coffee", category: "coffee" },
  { id: "draft", category: "beer" },
  { id: "cocktails", category: "cocktails" },
  { id: "wine", category: "wine" },
  { id: "sherry", category: "wine" },
  { id: "lemonade", category: "soft" },
];
