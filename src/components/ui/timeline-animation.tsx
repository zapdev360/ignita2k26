import React, { ElementType } from "react";
import { motion, Variants, MotionProps } from "framer-motion";

type TimelineContentProps = {
  as?: string | ElementType;
  animationNum?: number;
  timelineRef?: React.RefObject<Element>;
  customVariants?: Variants;
  children?: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
};

export const TimelineContent = ({
  as = "div",
  animationNum = 0,
  timelineRef,
  customVariants,
  children,
  className,
  href,
  target,
  rel,
}: TimelineContentProps) => {
  // Map standard HTML tags to motion components
  const Component = (motion as any)[as as keyof typeof motion] || motion.div;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ root: timelineRef, once: true, margin: "-50px" }}
      variants={customVariants}
      custom={animationNum}
      className={className}
      href={href}
      target={target}
      rel={rel}
    >
      {children}
    </Component>
  );
};
