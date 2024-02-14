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
	class="flex sm:px-20 items-center justify-center py-6 flex-col bg-indigo-950 z-50 bg-transparent border border-indigo-950 sm:rounded-2xl shadow-md shadow-indigo-950 gap-5 w-full h-full sm:w-fit sm:h-fit"
>
	<div class="flex gap-1 items-center flex-col">
		<Heading customSize="text-5xl" class="text-white text-center">SignIn</Heading>
		<P class="text-white">to continue FalkRandom</P>
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

		<div class="w-full flex flex-col gap-2">
			<Button type="submit" class="w-full">SignIn</Button>
			<Helper class="text-white text-md">Haven't account yet? <A href="/sign-up">SigUp</A></Helper>
		</div>
	</form>
</div>

<style>
</style>
