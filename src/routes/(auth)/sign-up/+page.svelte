<script lang="ts">
	import { SignUpPage } from '$lib/pages/signup';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<svelte:head>
	<title>SignUp</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<SignUpPage bind:action={form} />
