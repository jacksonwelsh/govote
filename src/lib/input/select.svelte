<script>
	import { createEventDispatcher } from 'svelte';

	export let options = [];
	export let label = undefined;
	export let value = '';

	const dispatch = createEventDispatcher();
	const onFocus = () => dispatch('focus');
</script>

<div>
	<label
		>{label}
		<select
			bind:value
			on:focus={onFocus}
			class="mt-1 block w-full rounded-md py-2 pl-3 pr-10 text-base focus:border-slate-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 sm:text-sm"
		>
			{#each options as option}
				<option>{option}</option>
			{/each}
		</select>
	</label>
</div>
