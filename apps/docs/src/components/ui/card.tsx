import * as React from "react";
import { tv } from "tailwind-variants";

const Card = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={tv({
			base: "rounded-lg border bg-card text-card-foreground shadow-sm",
		})({ className })}
		{...props}
	/>
));
Card.displayName = "Card";

export { Card };
