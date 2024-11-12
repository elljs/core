import { Command } from "lucide-react";
import { tv, VariantProps } from "tailwind-variants";

const logoVariants = tv({
	slots: {
		base: "flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground",
		icon: "size-4",
	},
	variants: {
		rounded: {
			default: {
				base: "rounded-lg",
			},
			none: {
				base: "rounded-none",
			}
		},
		size: {
			default: {
				base: "size-8",
				icon: "size-4",
			},
			sm: {
				base: "size-7",
				icon: "size-3",
			},
			md: {
				base: "size-8",
				icon: "size-4",
			},
			lg: {
				base: "size-10",
				icon: "size-5",
			},
			xl: {
				base: "size-12",
				icon: "size-6",
			},
			"2xl": {
				base: "size-14",
				icon: "size-7",
			},
			"3xl": {
				base: "size-16",
				icon: "size-8",
			},
		},
	},
	defaultVariants: {
		rounded: "default",
		size: "default",
	},
});

export interface LogoProps
	extends React.HTMLAttributes<HTMLDivElement>,
	VariantProps<typeof logoVariants> { }

const Logo = ({ className, rounded, size, ...props }: LogoProps) => {
	const { base, icon } = logoVariants({ className, rounded, size });

	return (
		<div {...props} className={base()}>
			<Command className={icon()} />
		</div>
	);
};
Logo.displayName = "Logo";

export { Logo, logoVariants };
