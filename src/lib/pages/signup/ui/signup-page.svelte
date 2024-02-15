<script lang="ts">
	import { enhance } from '$app/forms';
	import { FormInput } from '$lib/shared/ui';
	import { A, Button, Heading, Helper, Toast } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	export let action: any;
	let loading = false;

	const { form, errors, handleChange, handleSubmit, updateField, updateValidateField } = createForm(
		{
			initialValues: {
				username: '',
				email: '',
				password: '',
				confirmpassword: ''
			},
			validationSchema: yup.object().shape({
				username: yup.string().required('Username should not be empty'),
				email: yup.string().email('Please, input the email').required('Email should not be empty'),
				password: yup
					.string()
					.required('Password should not be empty')
					.min(6, 'Password should have at least 6 characters'),
				confirmpassword: yup
					.string()
					.required('Please, retype the password')
					.oneOf([yup.ref('password')], 'Passwords should match')
			}),
			onSubmit: () => {
				loading = true;
			}
		}
	);

	$: {
		if (action !== null) {
			console.log(action);
			loading = false;
			updateField(action.path, '');
		}
	}
</script>

<div
	class="z-50 flex h-full w-full flex-col items-center justify-center gap-5 border border-indigo-950 bg-blue-950 py-6 shadow-md shadow-indigo-950 sm:h-fit sm:w-fit sm:rounded-2xl sm:px-20"
>
	<div class="flex flex-col items-center gap-1">
		<Heading customSize="text-5xl" class="text-center text-white">SignUp</Heading>
	</div>
	<form class="flex flex-col gap-4" on:submit={handleSubmit} method="POST" use:enhance>
		<FormInput
			bind:value={$form.username}
			bind:error={$errors.username}
			{handleChange}
			name="username"
			disabled={loading}
			type="text"
			label="Username"
			placeholder="e.g. falkomer"
			autoComplete="username"
		/>
		<FormInput
			bind:value={$form.email}
			bind:error={$errors.email}
			{handleChange}
			disabled={loading}
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
			disabled={loading}
			type="password"
			label="Password"
			placeholder="•••••••••"
			autoComplete="new-password"
		/>
		<FormInput
			bind:value={$form.confirmpassword}
			bind:error={$errors.confirmpassword}
			{handleChange}
			disabled={loading}
			name="confirmpassword"
			type="password"
			label="Confirm Password"
			placeholder="•••••••••"
			autoComplete="new-password"
		/>
		<div class="flex w-full flex-col gap-2">
			<Button type="submit" class="w-full" disabled={loading}>SignUp</Button>
			<Helper class="text-md text-center text-white"
				>Already registered? <A href="/sign-up">SignIn</A></Helper
			>
		</div>
	</form>
</div>

{#if action !== null && action.message}
	<Toast
		class="absolute bottom-4 right-4 z-[10000] [&>button]:bg-red-500 hover:[&>button]:bg-red-700 [&>div]:bg-red-500"
	>
		<ExclamationCircleOutline slot="icon" class="h-6 w-6 bg-red-500 text-red-500 " />
		<p class="bg-white text-base font-semibold text-red-500">
			{action.message}
		</p>
	</Toast>
{/if}

<style>
</style>
