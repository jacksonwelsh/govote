<script>
	export let label = undefined;
	export let hint = undefined;
	export let rows = 6;

	export let value = '';
</script>

<form class="my-2">
	<label>
		{label}
		<textarea
			bind:value
			class="w-full rounded-md border-slate-700 bg-slate-800 focus:border-slate-500 focus:outline-none"
			{rows}
		/>
	</label>
	{#if hint} <p class="mt-1 text-sm text-slate-400">{hint}</p>{/if}
</form>
