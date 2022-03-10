<!-- This file generates a detailed petition page -->
<script context="module">
	//The formatting of the page is defined in Page.svelte
	import Page from '$lib/petition/Page.svelte';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch }) {
		return {
			props: { id: params.id }
		};
	}
</script>

<script>
	export let id;

	const petition = fetch('./' + id + '.json').then((r) => r.json());
</script>

{#await petition}
	loading...
{:then petition}
	<Page {...petition} />
{:catch}
	oops
{/await}
