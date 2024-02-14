<script lang="ts">
	import { Motion, AnimatePresence, useViewportScroll } from 'svelte-motion';
	import { cn } from '$lib/shared/lib';
	import { A } from 'flowbite-svelte';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	export let navItems;
	export let className = void 0;
	const { scrollYProgress } = useViewportScroll();
	let visible = false;
	$: $scrollYProgress, updateDirection();
	function updateDirection() {
		let direction = $scrollYProgress - scrollYProgress.getPrevious();
		if (scrollYProgress.get() < 0.05) {
			visible = false;
		} else {
			if (direction < 0) {
				visible = true;
			} else {
				visible = false;
			}
		}
	}
</script>

{#if !visible}
	<header
		transition:slide={{ duration: 400, easing: quintOut, axis: 'y' }}
		class="absolute left-0 right-0 top-0 flex items-center justify-between px-4 py-3 shadow shadow-indigo-950"
	>
		<span class="text-2xl text-white">Logo</span>
		<div class="flex gap-x-6">
			{#each navItems as navItem, idx (`link=${idx}`)}
				<a
					href={navItem.link}
					class={cn('relative flex items-center gap-x-1 text-neutral-50 hover:text-neutral-300')}
				>
					<svelte:component this={navItem.icon} class="block h-4 w-4 text-white sm:hidden" />
					<span class="block h-4 w-4 text-white sm:hidden">{navItem.icon}</span>
					<span class="hidden text-sm sm:block">{navItem.name}</span>
				</a>
			{/each}
		</div>
		<A href="/sign-in">
			<button
				class="relative rounded-full border border-neutral-200 border-white/[0.2] px-4 py-2 text-sm font-medium text-white"
			>
				<span>SignIn</span>
				<span
					class="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
				/>
			</button>
		</A>
	</header>
{/if}

<AnimatePresence show={true}>
	<Motion
		let:motion
		initial={{
			opacity: 1,
			y: -100
		}}
		animate={{
			y: visible ? 0 : -100,
			opacity: visible ? 1 : 0
		}}
		transition={{
			duration: 0.2
		}}
	>
		<div
			use:motion
			class={cn(
				'fixed inset-x-0 top-4 z-[5000] mx-auto flex max-w-fit items-center justify-center space-x-4 rounded-full border border-white/[0.2] bg-blue-950 py-2 pl-8 pr-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]',
				className
			)}
		>
			{#each navItems as navItem, idx (`link=${idx}`)}
				<a
					href={navItem.link}
					class={cn('relative flex items-center gap-x-2 text-neutral-50 hover:text-neutral-300')}
				>
					<svelte:component this={navItem.icon} class="block h-4 w-4 text-white sm:hidden" />
					<span class="block h-4 w-4 text-white sm:hidden">{navItem.icon}</span>
					<span class="hidden text-sm sm:block">{navItem.name}</span>
				</a>
			{/each}
			<A href="/sign-in">
				<button
					class="relative rounded-full border border-neutral-200 border-white/[0.2] px-4 py-2 text-sm font-medium text-white"
				>
					<span>SignIn</span>
					<span
						class="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
					/>
				</button>
			</A>
		</div>
	</Motion>
</AnimatePresence>
