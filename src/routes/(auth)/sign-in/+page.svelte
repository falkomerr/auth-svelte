<script lang="ts">
	import { SignInPage } from '$lib/pages/signin';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<svelte:head>
	<title>SignIn</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<SignInPage bind:action={form} />
