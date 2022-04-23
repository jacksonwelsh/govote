<script>
	import Banner from '$lib/Banner.svelte';
	import LoadingCard from '$lib/petition/loadingCard.svelte';
	import Card from '$lib/petition/card.svelte';
	const petitions = fetch('/petitions.json').then((r) => r.json());
</script>

<svelte:head>
	<title>GoVote</title>
</svelte:head>

<div class="flex h-full w-full flex-grow flex-col">
	<Banner>
		<div class="my-auto">
			<h1 class="my-2">Welcome to GoVote</h1>
			<p>Create, sign, and view petitions from your fellow students.</p>
		</div>
	</Banner>
	<section class="container mx-auto my-6 px-2 md:px-0">
		{#await petitions}
			<h2 class="mb-4">Loading Petitions...</h2>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
				{#each Array(10) as _}
					<LoadingCard />
				{/each}
			</div>
		{:then petitions}
			<h2 class="mb-4">Recent Petitions</h2>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
				{#each petitions as petition}
					<Card {...petition} />
				{/each}
			</div>
		{:catch error}
			GoFail. :(
		{/await}
	</section>
</div>
