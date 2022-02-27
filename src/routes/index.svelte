<svelte:head>
	<title>GoVote Home</title>
</svelte:head>

<script context="module" lang="ts">
	import Banner from '$lib/Banner.svelte';
	import Card from '$lib/petition/card.svelte';
	import { v4 } from '@lukeed/uuid';

	export async function load({ fetch }) {
		const res = await fetch('/petitions.json');
		const petitions = await res.json();

		return {
			props: { petitions }
		};
	}
</script>

<script>
	export let petitions;
</script>

<div class="flex h-full w-full flex-grow flex-col">
	<Banner>
		<div class="my-auto">
			<h1 class="my-2">Welcome to GoVote</h1>
			<p>Create, sign, and view petitions from your fellow students.</p>
		</div>
	</Banner>
	<section class="container mx-auto my-6 px-2 md:px-0">
		<!--{#await petitionsPromise}
			GoLoad...
		{:then petitions}-->
		<h2 class="mb-4">Recent Petitions</h2>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
			{#each petitions as petition}
				<Card {...petition} id={v4()} />
			{/each}
		</div>
		<!--{:catch error}
			GoFail. :(
		{/await}-->
	</section>
</div>
