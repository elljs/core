import * as React from "react";
import { AriaCheckboxProps, VisuallyHidden, useCheckbox } from "react-aria";
import { useToggleState } from 'react-stately';
import { ClassValue, VariantProps, tv } from "tailwind-variants";

const checkboxVariants = tv({
  slots: {
    base: 'flex items-center group',
    box: 'flex flex-shrink-0 justify-center items-center mr-2 h-5 w-5 transition ease-in-out duration-150 rounded border-2 border-primary text-foreground',
    icon: 'stroke-white w-3 h-3 cursor-auto',
    label: 'select-none'
  },
  variants: {
    isSelected: {
      true: {
        box: 'bg-primary',
      }
    },
    isDisabled: {
      true: {
        box: 'border-gray-300',
        label: 'text-gray-400'
      },
      false: {
        box: 'opacity-50 cursor-not-allowed',
        label: 'text-gray-700 group-active:text-gray-800'
      }
    },
  },
  defaultVariants: {
    isSelected: false,
    isDisabled: false,
  }
});

export interface CheckboxProps
  extends React.PropsWithChildren<AriaCheckboxProps> {
  className?: ClassValue;
  variants?: VariantProps<typeof checkboxVariants>;
  isLoading?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { className, children, ...props },
    externalRef
  ) => {
    const state = useToggleState(props);
    const internalRef = React.useRef<HTMLInputElement>(null);
    const ref = externalRef || internalRef;
    const { inputProps } = useCheckbox({
      "aria-label": 'hidden',
      ...props
    }, state, ref as React.RefObject<HTMLInputElement>);
    const { base, box, icon, label } = checkboxVariants({ isSelected: state.isSelected, isDisabled: props.isDisabled, className });

    return (
      <label aria-label="checkbox" className={base()}>
        <VisuallyHidden>
          <input {...inputProps} ref={ref} />
        </VisuallyHidden>
        <div className={box()}>
          <svg className={icon()} viewBox="0 0 18 18">
            <polyline
              className="origin-center transition-all ease-in-out duration-150"
              points="1 9 7 14 15 4"
              fill="none"
              strokeWidth={3}
              strokeDasharray={22}
              strokeDashoffset={state.isSelected ? 44 : 66}
            />
          </svg>
        </div>
        <span className={label()}>{children}</span>
      </label>
    )
  });

Checkbox.displayName = 'Checkbox';

export { Checkbox };
