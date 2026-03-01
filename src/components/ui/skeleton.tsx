import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

interface SkeletonGroupProps extends React.ComponentProps<"div"> {
  count: number;
}

export const SkeletonGroups = ({ count = 1, ...props }: SkeletonGroupProps) => {
  return (
    <>
      {[...Array(count)].map((_, idx) => (
        <Skeleton key={idx} {...props} />
      ))}
    </>
  );
};
