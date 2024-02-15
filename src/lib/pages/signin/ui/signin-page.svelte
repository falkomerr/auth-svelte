<script lang="ts">
	import { enhance } from '$app/forms';
	import { FormInput } from '$lib/shared/ui';
	import { A, Button, Heading, Helper, Toast } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	export let action: any;
	let loading = false;

	const { form, errors, handleChange, handleSubmit, updateField } = createForm({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: yup.object().shape({
			email: yup.string().email('Please, input the email').required('Email should not be empty'),
			password: yup.string().required('Password should not be empty')
		}),
		onSubmit: (values) => {
			loading = true;
		}
	});

	$: {
		if (action !== null) {
			loading = false;
			updateField(action.path, '');
		}
	}
</script>

<div
	class="z-50 flex h-full w-full flex-col items-center justify-center gap-5 border border-indigo-950 bg-blue-950 py-6 shadow-md shadow-indigo-950 sm:h-fit sm:w-fit sm:rounded-2xl sm:px-20"
>
	<div class="flex flex-col items-center gap-1">
		<Heading customSize="text-5xl" class="text-center text-white">SignIn</Heading>
	</div>
	<form class="flex flex-col gap-4" on:submit={handleSubmit} method="POST" use:enhance>
		<FormInput
			disabled={loading}
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
			disabled={loading}
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
			<Button type="submit" class="w-full" disabled={loading}>SignIn</Button>
			<Helper class="text-md text-center text-white"
				>Haven't account yet? <A href="/sign-up">SigUp</A></Helper
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
