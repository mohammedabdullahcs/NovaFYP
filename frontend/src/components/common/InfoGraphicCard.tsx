import { motion, useMotionValue, useTransform } from "framer-motion";
import type { ReactNode } from "react";

interface InfoGraphicCardProps {
  stepNumber: string;
  title: string;
  description: string;
  icon?: ReactNode;
  iconUrl?: string;
}

export default function InfoGraphicCard({
  stepNumber,
  title,
  description,
  icon,
  iconUrl
}: InfoGraphicCardProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const tiltX = useTransform(rotateX, [-1, 1], [8, -8]);
  const tiltY = useTransform(rotateY, [-1, 1], [-8, 8]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(y * -2);
    rotateY.set(x * 2);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      className="glass-card rounded-2xl p-6 flex flex-col gap-4 border border-transparent hover:border-brand-500/50 transition"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 900,
        transformStyle: "preserve-3d",
        rotateX: tiltX,
        rotateY: tiltY
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-brand-400 text-sm font-semibold">
          Step {stepNumber}
        </span>
        <div className="text-2xl">
          {iconUrl ? (
            <img src={iconUrl} alt="" className="w-8 h-8 opacity-90" />
          ) : (
            icon
          )}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-text-100">{title}</h3>
      <p className="text-sm text-text-200 leading-relaxed">{description}</p>
    </motion.div>
  );
}
