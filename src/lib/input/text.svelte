<script>
	import { createEventDispatcher } from 'svelte';
	export let label = undefined;
	export let hint = undefined;
	export let value = '';
	const dispatch = createEventDispatcher();
	const onFocus = () => dispatch('focus');
</script>

<div class="my-2">
	<label>
		{label}
		<input
			bind:value
			on:focus={onFocus}
			class="w-full rounded-md focus:border-slate-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
			type="text"
		/>
	</label>
	{#if hint} <p class="mt-1 text-sm text-slate-400">{hint}</p>{/if}
</div>
