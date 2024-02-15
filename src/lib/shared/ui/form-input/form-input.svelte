<script>
	import { Input, Label } from 'flowbite-svelte';
	export let value = '';
	export let error = '';
	const { handleChange, name, type, label, placeholder, autoComplete, disabled } = $$props;
</script>

<div class="w-64">
	<Label class="text-start text-lg text-white {error && 'text-red-500'}" forHtml={name}
		>{label}</Label
	>
	<Input
		{name}
		{type}
		class="w-64 text-black"
		color={error ? 'red' : undefined}
		id={name}
		{disabled}
		{placeholder}
		on:change={handleChange}
		on:blur={handleChange}
		bind:value
		{autoComplete}
	/>
	{#if error}
		<p class="text-md text-red-500">{error}</p>
	{/if}
</div>
