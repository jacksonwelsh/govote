<script context="module" lang="ts">
	import Banner from '$lib/Banner.svelte';
	import Card from '$lib/petition/card.svelte';
	import { v4 } from '@lukeed/uuid';
	const cards = await this.fetch(`petitions.json`).then(r => r.json()).then(posts => {
		return { posts };	//Extract all petitions
	});
</script>

<script lang="ts">
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="flex h-full w-full flex-grow flex-col">
	<Banner>
		<div class="my-auto">
			<h1 class="my-2">Welcome to GoVote</h1>
			<p>Create, sign, and view petitions from your fellow students.</p>
		</div>
	</Banner>
	<section class="container mx-auto my-6 px-2 md:px-0">
		<h2 class="mb-4">Recent Petitions</h2>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
			{#each cards as petition}
				<Card {...petition} id={v4()} />
			{/each}
		</div>
	</section>
</div>
