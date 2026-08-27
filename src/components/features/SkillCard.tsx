import { IconType } from "react-icons";
import { MagicCard } from "@/components/magicui/magic-card";
import { useTilt3D } from "@/lib/useTilt3D";

interface SkillCardProps {
  Icon: IconType;
  label: string;
  glow: string;
  count: number;
  gradientColor: string;
}

export const SkillCard = ({ Icon, label, glow, count, gradientColor }: SkillCardProps) => {
  const tiltRef = useTilt3D<HTMLDivElement>({ max: 6, scale: 1.04 });
  void glow;

  return (
    <div ref={tiltRef} className="h-full">
      <MagicCard
        className="h-full cursor-pointer flex-col items-center justify-center dark:bg-[#0a001a] bg-[#efe5ff] shadow-2xl whitespace-nowrap border border-transparent hover:border-[#a877fd]/40 transition-colors rounded-2xl"
        gradientColor={gradientColor}
      >
        <section className="flex flex-col items-center justify-center h-full py-10 font3">
          <Icon size={64} />
          <h2 className="text-2xl md:text-3xl mt-3">{label}</h2>
          <h3 className="mt-4 text-5xl md:text-6xl bg-gradient-to-r dark:from-[#a877fd] dark:to-[#63e8ff] from-[#330288] to-[#a877fd] bg-clip-text text-transparent">
            {count}%
          </h3>
        </section>
      </MagicCard>
    </div>
  );
};
