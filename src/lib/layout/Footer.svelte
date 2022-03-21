<script>
	const authors = ['jacksonwelsh', 'LeifMessinger', 'tb7512'];
</script>

<footer
	class= bg-slate-200 py-6 underline-offset-1 dark:bg-slate-800 text-center"
>
	Created by
	<!-- Iterate over authors and join appropriately. -->
	{#each authors as author, i}
		&nbsp<a href={`//github.com/${author}`} class="underline" target="_blank">@{author}</a>{i ===
		authors.length - 2
			? ', and'
			: i === authors.length - 1
			? '.'
			: ','}
	{/each}
</footer>
