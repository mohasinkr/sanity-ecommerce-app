import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

export const typographyVariants = cva("", {
  variants: {
    variant: {
      heading:
        "text-md font-bold md:text-3xl",
      subheading:
        "text-base md:text-lg font-medium",
      description:
        "text-xs tracking-[2%] md:font-medium md:leading-5 leading-[14.63px]",
      button:
        "text-xs leading-[18px] md:text-lg md:leading-7 font-medium tracking-[1.2px] md:tracking-[0.35px]",
    },
    color: {
      white: "text-white",
      black: "text-brand-black",
      "light-gray": "text-brand-light-gray",
      gray: "text-brand-gray",
      blue: "text-primary",
      "light-blue": "text-secondary",
    },
  },
  defaultVariants: {
    variant: "description",
    color: "black",
  },
});

export type TypographyProps = VariantProps<typeof typographyVariants> &
  React.ComponentProps<"div"> & {
    children: React.ReactNode;
    className?: string;
    as?: JSX.ElementType;
  };

const Typography = ({
  children,
  className,
  variant,
  as,
  color,
  ...props
}: TypographyProps) => {
  const Comp = as || "p";
  return (
    <Comp
      className={cn(typographyVariants({ variant, color, className }))}
      {...props}
    >
      {children}
    </Comp>
  );
};

export default Typography;