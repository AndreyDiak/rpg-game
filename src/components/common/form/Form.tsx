/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLAttributes, PropsWithChildren } from 'react';
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

interface FormProps<T extends FieldValues>
	extends PropsWithChildren,
		Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
	form: UseFormReturn<T>;
	onSubmit: SubmitHandler<T>;
}

export const Form = <T extends FieldValues>({
	children,
	onSubmit,
	form,
	...rest
}: FormProps<T>) => {
	return (
		<form
			noValidate
			autoComplete="off"
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit(async (...args) => {
					try {
						onSubmit?.(...args);
					} catch (e: any) {
						form.setError('root', e.message);
					}
				})(e);
			}}
			{...rest}
		>
			<FormProvider {...form}>{children}</FormProvider>
		</form>
	);
};
