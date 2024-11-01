import { VariantProps, tv } from "tailwind-variants";

const statusLightVariants = tv({
    slots: {
        base: "inline-flex relative rounded-full m-1",
        bg: 'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
        dot: 'h-full w-full rounded-full'
    },
    variants: {
        variant: {
            default: {
                bg: "bg-primary",
                dot: "bg-primary",
            },
            success: {
                bg: "bg-green-500",
                dot: "bg-green-500"
            },
            warning: {
                dot: "bg-orange-500"
            },
            error: {
                dot: "bg-red-500",
            }
        },
        size: {
            default: {
                base: "size-2",
            },
            sm: {
                base: "size-1",
            },
            md: {
                base: "size-3",
            }
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

export interface StatusLightProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusLightVariants> { }

const StatusLight = ({ className, variant, size, ...props }: StatusLightProps) => {
    const { base, dot, bg } = statusLightVariants({ className, variant, size });

    return (
        <span {...props} className={base()}>
            <span className={bg()} />
            <span className={dot()} />
        </span>
    );
};
StatusLight.displayName = "StatusLight";

export { StatusLight, statusLightVariants };
