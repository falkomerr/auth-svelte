<script>
	import { Input, Label } from 'flowbite-svelte';
	export let value = '';
	export let error = '';
	const { handleChange, name, type, label, placeholder, autoComplete } = $$props;
</script>

<div>
	<Label class="text-white text-lg text-start {error && 'text-red-500'}" forHtml={name}
		>{label}</Label
	>
	<Input
		{name}
		{type}
		class="w-64"
		color={error ? 'red' : ''}
		id={name}
		{placeholder}
		on:change={handleChange}
		on:blur={handleChange}
		bind:value
		{autoComplete}
	/>
	{#if error}
		<p class="text-red-500 text-md">{error}</p>
	{/if}
</div>
