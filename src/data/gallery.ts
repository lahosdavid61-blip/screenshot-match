// Placeholders until the owner supplies approved photographs (usage rights unconfirmed).
export type Shot = {
  id: string;
  key: "interior" | "bar" | "facade" | "drinks" | "detail" | "evening";
  span: string;
};
export const gallery: Shot[] = [
  { id: "g1", key: "interior", span: "md:col-span-7 md:row-span-2 aspect-[4/5] md:aspect-auto" },
  { id: "g2", key: "facade", span: "md:col-span-5 aspect-[4/3]" },
  { id: "g3", key: "drinks", span: "md:col-span-5 aspect-square" },
  { id: "g4", key: "detail", span: "md:col-span-4 aspect-[3/4]" },
  { id: "g5", key: "bar", span: "md:col-span-8 aspect-[16/9]" },
  { id: "g6", key: "evening", span: "md:col-span-12 aspect-[21/9]" },
];
