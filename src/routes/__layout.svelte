<script lang="ts">
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import '../app.css';
</script>

<div class="flex min-h-screen flex-col">
	<Header />

	<main class="flex h-full w-full flex-grow flex-col">
		<slot />
	</main>

	<Footer />
</div>
