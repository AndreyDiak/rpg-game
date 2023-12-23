/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	HTMLAttributes,
	InputHTMLAttributes,
	PropsWithChildren,
	ReactElement,
	ReactNode,
	Ref,
	cloneElement,
	forwardRef,
} from 'react';
import { UseFormRegisterReturn, get, useFormContext } from 'react-hook-form';

interface ChildrenProps<T = unknown> {
	value?: T;
	disabled?: boolean;
	invalid?: boolean;
	id?: string;
	onChange(value: T): void;
}

interface FormFieldProps
	extends PropsWithChildren,
		Omit<HTMLAttributes<HTMLDivElement>, keyof UseFormRegisterReturn>,
		UseFormRegisterReturn {
	placeholder?: string;
	type?: InputHTMLAttributes<HTMLInputElement>['type'];
	children?: ReactElement<ChildrenProps & { ref?: Ref<any> }>;
	description?: ReactNode;
	title?: string;
}

export const FormField = forwardRef<any, FormFieldProps>(
	(
		{
			title,
			description,
			children,
			onChange,
			name,
			disabled,
			id,
			placeholder,
			pattern,
			type = 'text',
			...rest
		},
		ref,
	) => {
		const {
			watch,
			formState: { errors },
		} = useFormContext();
		const value = watch(name);
		const error = get(errors, name) as Error | undefined;
		const childrenProps: ChildrenProps = {
			value: value,
			disabled,
			invalid: !!error,
			id,
			onChange: (e: any) => {
				onChange?.({
					target: { name, value: e.target.value },
					type: 'change',
				});
			},
		};
		return (
			<div {...rest}>
				{title && <div>{title}</div>}
				{children ? (
					cloneElement(children, { ...childrenProps, ref })
				) : (
					<input
						type={type}
						id={name}
						pattern={pattern}
						placeholder={placeholder}
						ref={ref}
						{...(childrenProps as any)}
					/>
				)}
				{description && <div>{description}</div>}
				{error && <span>{error.message}</span>}
			</div>
		);
	},
);
