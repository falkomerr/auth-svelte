<script>
	import { BackgroundBeams } from '$lib/shared/ui';
	import { HomeIcon } from '$lib/shared/ui';
	import { A, Button, P } from 'flowbite-svelte';
</script>

<div class="flex h-screen w-screen items-center justify-center">
	<A href="/" class="absolute left-4 top-4 z-[10000] flex cursor-pointer gap-x-2">
		<Button class="flex gap-x-2">
			<HomeIcon />
			<P class="font-medium text-white">Home</P>
		</Button>
	</A>

	<slot />
	<BackgroundBeams />
</div>

<style></style>
