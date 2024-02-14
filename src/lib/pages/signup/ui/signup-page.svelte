<script>
	import { A, Button, Heading, Helper, Input, Label, P } from 'flowbite-svelte';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { FormInput } from '$lib/shared/ui';

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			username: '',
			email: '',
			password: '',
			confirmpassword: ''
		},
		validationSchema: yup.object().shape({
			username: yup.string().required('Username should not be empty'),
			email: yup.string().email('Please, input the email').required('Email should not be empty'),
			password: yup.string().required('Password should not be empty'),
			confirmpassword: yup
				.string()
				.required('Please, retype the password')
				.oneOf([yup.ref('password'), null], 'Passwords should match')
		}),
		onSubmit: (values) => {
			alert(JSON.stringify(values));
		}
	});
</script>

<div
	class="flex sm:px-20 items-center justify-center py-6 flex-col z-50 bg-transparent border border-indigo-950 sm:rounded-2xl shadow-md shadow-indigo-950 gap-5 w-full h-full sm:w-fit sm:h-fit"
>
	<div class="flex gap-1 items-center flex-col">
		<Heading customSize="text-5xl" class="text-white text-center">SignUp</Heading>
		<P class="text-white">to continue FalkAuth</P>
	</div>
	<form class="flex flex-col gap-4" on:submit={handleSubmit}>
		<FormInput
			bind:value={$form.username}
			bind:error={$errors.username}
			{handleChange}
			name="username"
			type="text"
			label="Username"
			placeholder="e.g. falkomer"
			autoComplete="username"
		/>
		<FormInput
			bind:value={$form.value}
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
			type="password"
			label="Password"
			placeholder="•••••••••"
			autoComplete="new-password"
		/>
		<FormInput
			bind:value={$form.confirmpassword}
			bind:error={$errors.confirmpassword}
			{handleChange}
			name="confirmpassword"
			type="password"
			label="Confirm Password"
			placeholder="•••••••••"
			autoComplete="new-password"
		/>
		<div class="w-full flex flex-col gap-2">
			<Button type="submit" class="w-full">SignUp</Button>
			<Helper class="text-white text-md">Already registered? <A href="/sign-up">SigIn</A></Helper>
		</div>
	</form>
</div>

<style>
</style>
