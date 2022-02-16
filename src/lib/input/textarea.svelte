<script>
	import { createEventDispatcher } from 'svelte';

	export let label = undefined;
	export let hint = undefined;
	export let rows = 6;

	export let value = '';

	const dispatch = createEventDispatcher();
	const onFocus = () => dispatch('focus');
</script>

<form class="my-2">
	<label>
		{label}
		<textarea
			bind:value
			on:focus={onFocus}
			class="w-full rounded-md focus:border-slate-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
			{rows}
		/>
	</label>
	{#if hint} <p class="text-sm text-slate-400">{hint}</p>{/if}
</form>
