<script>
	export let _id = '';
	export let title = _id || '';
	export let desc = '';
	const formattedDesc = desc.substring(0, 255) + '...';
</script>

<a href={`/petitions/${_id}`}>
	<div class="group h-full rounded-lg bg-white p-4 shadow-lg transition-all hover:shadow-2xl dark:bg-slate-800">
		<h3 class="group-hover:text-black group-hover:underline dark:group-hover:text-white">
			{title}
		</h3>
		<p class="text-slate-600 transition-colors group-hover:text-slate-800 dark:text-slate-300 group-hover:dark:text-gray-100">
			{formattedDesc}
		</p>
	</div>
</a>
