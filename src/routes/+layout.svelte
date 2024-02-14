<script>
	import './app.css';
	import { navigating, updated } from '$app/stores';
	import 'nprogress/nprogress.css';
	import NProgress from 'nprogress';
	import { Toast } from 'flowbite-svelte';
	import { FireOutline, RefreshOutline } from 'flowbite-svelte-icons';

	NProgress.configure({
		minimum: 0.16,
		showSpinner: false
	});

	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}
</script>

<div class="app">
	<main>
		<slot />
	</main>
	{#if $updated}
		<Toast class="fixed bottom-2 left-1/2 right-1/2 ml-3 -translate-x-1/2 transform px-3 py-2 ">
			<FireOutline
				slot="icon"
				class="h-5 w-5 bg-primary-100 text-primary-500 dark:bg-primary-800 dark:text-primary-200"
			/>
			<div class="mr-auto flex flex-col items-start">
				A new version of the app is available
				<button
					class="ms-auto flex gap-x-2 rounded-lg p-1.5 font-medium text-primary-600 hover:bg-primary-100 dark:text-primary-500 dark:hover:bg-gray-700"
					on:click={() => location.reload()}
				>
					Refresh the page
					<RefreshOutline />
				</button>
			</div>
		</Toast>
	{/if}
</div>

<style>
	#nprogress .spinner {
		display: none;
	}
</style>
