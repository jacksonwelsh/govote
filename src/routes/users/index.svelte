<script>
	import Banner from '$lib/Banner.svelte';
	import Card from '$lib/user/card.svelte';
	const users = fetch('/users.json').then((r) => r.json());
</script>

<svelte:head>
	<title>GoVote</title>
</svelte:head>

<div class="flex h-full w-full flex-grow flex-col">
	<Banner>
		<div class="my-auto">
			<h1 class="my-2">Welcome to GoVote</h1>
			<p>View the profiles of other users.</p>
		</div>
	</Banner>
	<section class="container mx-auto my-6 px-2 md:px-0">
		{#await users}
			<h2 class="mb-4">Loading users...</h2>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
				{#each Array(10) as _}
					<Card loading={true} />
				{/each}
			</div>
		{:then users}
			<h2 class="mb-4">Recent users</h2>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
				{#each users as user}
					<Card {...user} />
				{/each}
			</div>
		{:catch error}
			GoFail. :(
		{/await}
	</section>
</div>
