// Only drinks confirmed by public listings (Restaurant Guru review mentions, Visit Subotica).
// No prices are shown: none could be verified (only "RSD 1–500 per person" range).
export type MenuCategory = "coffee" | "beer" | "cocktails" | "wine" | "soft";
export type MenuItem = { id: string; category: MenuCategory; name: string; price?: number };

export const menuCategories: MenuCategory[] = ["coffee", "beer", "cocktails", "wine", "soft"];

export const menu: MenuItem[] = [
  { id: "coffee", category: "coffee", name: "Kafa / Coffee" },
  { id: "draft", category: "beer", name: "Točeno pivo / Draft beer" },
  { id: "cocktails", category: "cocktails", name: "Kokteli / Cocktails" },
  { id: "wine", category: "wine", name: "Vino / Wine" },
  { id: "sherry", category: "wine", name: "Fino sherry" },
  { id: "lemonade", category: "soft", name: "Limunada / Lemonade" },
];
