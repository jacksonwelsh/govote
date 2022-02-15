<script>
	export let label = undefined;
	export let hint = undefined;
	export let value = '';
</script>

<div class="my-2">
	<label>
		{label}
		<input
			bind:value
			class="w-full rounded-md border-slate-700 bg-slate-800 focus:border-slate-500 focus:outline-none"
			type="text"
		/>
	</label>
	{#if hint} <p class="mt-1 text-sm text-slate-400">{hint}</p>{/if}
</div>
