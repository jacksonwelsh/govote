<script>
	import Banner from '$lib/Banner.svelte';
	import Card from '$lib/group/card.svelte';
	const groups = fetch('/groups.json').then((r) => r.json());
</script>

<svelte:head>
	<title>GoVote</title>
</svelte:head>

<div class="flex h-full w-full flex-grow flex-col">
	<Banner>
		<div class="my-auto">
			<h1 class="my-2">Welcome to GoVote</h1>
			<p>Create, sign, and view groups from your fellow students.</p>
		</div>
	</Banner>
	<section class="container mx-auto my-6 px-2 md:px-0">
		{#await groups}
			<h2 class="mb-4">Loading groups...</h2>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
				{#each Array(10) as _}
					<Card loading={true} />
				{/each}
			</div>
		{:then groups}
			<h2 class="mb-4">Recent groups</h2>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
				{#each groups as group}
					<Card {...group} />
				{/each}
			</div>
		{:catch error}
			GoFail. :(
		{/await}
	</section>
</div>
