<script>
	export let _id = '';
	export let title = _id || '';
	export let desc = '';
	export let loading = false;
	const formattedDesc = desc.substring(0, 255) + '...';
</script>

{#if loading}
	<div
		class="group h-full rounded-lg bg-white p-4 shadow-lg transition-all hover:shadow-2xl dark:bg-slate-800"
	>
		<div class="w-full animate-pulse rounded-md bg-slate-200 dark:bg-slate-600">&nbsp;</div>
		{#each Array(3) as _}
			<div class="my-2 h-2 w-full animate-pulse rounded-md bg-slate-200 dark:bg-slate-600">
				&nbsp;
			</div>
		{/each}
	</div>
{:else}
	<a href={`/petitions/${_id}`}>
		<div
			class="group h-full rounded-lg bg-white p-4 shadow-lg transition-all hover:shadow-2xl dark:bg-slate-800"
		>
			<h3 class="group-hover:text-black group-hover:underline dark:group-hover:text-white">
				{title}
			</h3>
			<p
				class="text-slate-600 transition-colors group-hover:text-slate-800 dark:text-slate-300 group-hover:dark:text-gray-100"
			>
				{formattedDesc}
			</p>
		</div>
	</a>
{/if}
