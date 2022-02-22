<script context="module">
	import Banner from '$lib/Banner.svelte';
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<Banner>
	<div class="my-auto">
		<h1 class="my-2">About this site</h1>
		<p>An app to allow students to agregate their input for UNT.</p>
	</div>
</Banner>
