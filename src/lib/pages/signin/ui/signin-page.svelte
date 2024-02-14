<script>
	import { A, Button, Heading, Helper, P } from 'flowbite-svelte';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { FormInput } from '$lib/shared/ui';

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: yup.object().shape({
			email: yup.string().email('Please, input the email').required('Email should not be empty'),
			password: yup.string().required('Password should not be empty')
		}),
		onSubmit: (values) => {
			alert(JSON.stringify(values));
		}
	});
</script>

<div
	class="z-50 flex h-full w-full flex-col items-center justify-center gap-5 border border-indigo-950 bg-indigo-950 bg-transparent py-6 shadow-md shadow-indigo-950 sm:h-fit sm:w-fit sm:rounded-2xl sm:px-20"
>
	<div class="flex flex-col items-center gap-1">
		<Heading customSize="text-5xl" class="text-center text-white">SignIn</Heading>
	</div>
	<form class="flex flex-col gap-6" on:submit={handleSubmit}>
		<FormInput
			bind:value={$form.email}
			bind:error={$errors.email}
			{handleChange}
			name="email"
			type="text"
			label="Email"
			placeholder="e.g. test@example.com"
			autoComplete="email"
		/>

		<FormInput
			bind:value={$form.password}
			bind:error={$errors.password}
			{handleChange}
			name="password"
			type="text"
			label="Password"
			placeholder="•••••••••"
			autoComplete="password"
		/>

		<div class="flex w-full flex-col gap-2">
			<Button type="submit" class="w-full">SignIn</Button>
			<Helper class="text-md text-white">Haven't account yet? <A href="/sign-up">SigUp</A></Helper>
		</div>
	</form>
</div>

<style>
</style>
