<script context="module" lang="ts">
	import Add16 from 'carbon-icons-svelte/lib/Add16';
	export const prerender = true;
	import Banner from '$lib/Banner.svelte';
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
	<section class="container mx-auto">
		<p>Let's get started.</p>
		<a href="/create" class="my-2 inline-flex items-center rounded-md bg-slate-500 px-4 py-2">
			<Add16 class="mr-2" /> Create a petition</a
		>
	</section>
</div>
