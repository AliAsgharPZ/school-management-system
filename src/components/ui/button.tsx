import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold leading-none select-none shadow-sm transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-px active:translate-y-0 active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-[0_2px_5px_rgb(0_70_48_/_18%)] hover:bg-primary/92 hover:shadow-[0_5px_12px_rgb(0_70_48_/_20%)]",
        primary: "bg-primary text-primary-foreground shadow-[0_2px_5px_rgb(0_70_48_/_18%)] hover:bg-primary/92 hover:shadow-[0_5px_12px_rgb(0_70_48_/_20%)]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/40",
        outline: "border border-border-strong/70 bg-surface-1 text-foreground shadow-none hover:border-primary/45 hover:bg-surface-2",
        secondary: "border border-transparent bg-surface-2 text-foreground hover:bg-surface-3",
        ghost: "text-text-secondary shadow-none hover:bg-surface-2 hover:text-text-primary",
        link: "h-auto rounded-none p-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-11 px-4 py-2.5 has-[>svg]:px-3.5",
        sm: "min-h-9 gap-1.5 rounded-md px-3 text-xs has-[>svg]:px-2.5",
        lg: "min-h-12 rounded-lg px-6 text-base has-[>svg]:px-4",
        icon: "size-11 rounded-lg p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant ?? "default"}
      data-size={size ?? "default"}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
