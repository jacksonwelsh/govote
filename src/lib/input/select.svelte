<script>
	export let options = [];
	export let label = undefined;
	export let value = '';
</script>

<div>
	<label
		>{label}
		<select
			bind:value
			class="mt-1 block w-full rounded-md border-slate-700 bg-slate-800 py-2 pl-3 pr-10 text-base focus:border-slate-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
		>
			{#each options as option}
				<option>{option}</option>
			{/each}
		</select>
	</label>
</div>
