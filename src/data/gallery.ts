export type Shot = {
  id: string;
  key: "interior" | "bar" | "facade" | "drinks" | "detail" | "evening";
  span: string;
  src: string;
};
export const gallery: Shot[] = [
  {
    id: "g1",
    key: "interior",
    src: "/dot-interior-clean.png",
    span: "md:col-span-7 md:row-span-2 aspect-[4/5] md:aspect-auto",
  },
  { id: "g2", key: "facade", src: "/dot-exterior-clean.png", span: "md:col-span-5 aspect-[4/3]" },
  { id: "g3", key: "drinks", src: "/dot-coffee-clean.png", span: "md:col-span-5 aspect-square" },
  { id: "g4", key: "detail", src: "/dot-window-clean.png", span: "md:col-span-4 aspect-[3/4]" },
  { id: "g5", key: "bar", src: "/dot-bar-design-clean.png", span: "md:col-span-8 aspect-[16/9]" },
  { id: "g6", key: "evening", src: "/dot-wine-clean.png", span: "md:col-span-12 aspect-[21/9]" },
];
