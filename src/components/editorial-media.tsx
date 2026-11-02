import Image from "next/image";

const dimensions: Record<string, [number, number]> = {
  aristotle_light_study: [1672, 941], everyday_reading_scene: [1536, 1024],
  plotinus_reflection_study: [1086, 1448],
};
export function EditorialMedia({ name, alt, className = "", priority = false }: { name: string; alt: string; className?: string; priority?: boolean }) {
  const [width, height] = dimensions[name] ?? (name.startsWith("anaxagoras_") ? [1149, 1368] : ["greek_text_detail", "bound_book_detail", "light_on_paper", "stone_surface_detail", "open_page_detail"].includes(name) ? [1024, 1536] : [1254, 1254]);
  return <Image className={`editorial-media ${className}`} src={`/images/editorial/${name}.png`} alt={alt} width={width} height={height} unoptimized priority={priority} sizes="(max-width: 699px) 85vw, (max-width: 1099px) 45vw, 33vw" />;
}
