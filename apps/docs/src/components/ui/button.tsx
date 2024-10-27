import { LoaderCircle } from "lucide-react";
import * as React from "react";
import { AriaButtonOptions, useButton } from "react-aria";
import { ClassValue, type VariantProps, tv } from "tailwind-variants";

const buttonVariants = tv({
	base: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			destructive:
				"bg-destructive text-destructive-foreground hover:bg-destructive/90",
			outline:
				"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline",
		},
		size: {
			default: "h-10 px-4 py-2",
			sm: "h-9 rounded-md px-3",
			lg: "h-11 rounded-md px-8",
			icon: "h-10 w-10",
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	},
});

export interface ButtonProps
	extends React.PropsWithChildren<AriaButtonOptions<"button">> {
	slot?: string;
	className?: ClassValue;
	variants?: VariantProps<typeof buttonVariants>;
	isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ children, className, variants, isLoading, ...props }: ButtonProps,
		externalRef,
	) => {
		const internalRef = React.useRef<HTMLButtonElement>(null);
		const ref = externalRef || internalRef;
		const { buttonProps } = useButton(
			{ isDisabled: isLoading, ...props },
			ref as React.RefObject<HTMLButtonElement>,
		);

		return (
			<button
				ref={ref}
				className={buttonVariants({ ...variants, className })}
				{...buttonProps}
			>
				{isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
				{children}
			</button>
		);
	},
);

Button.displayName = "Button";

export { Button, buttonVariants };
