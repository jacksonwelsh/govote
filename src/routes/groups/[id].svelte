<!-- This file generates a detailed group page -->
<script context="module">
	//The formatting of the page is defined in Page.svelte
	import Page from '$lib/group/Page.svelte';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch }) {
		return {
			props: { id: params.id }
		};
	}
</script>

<script>
	export let id;

	const group = fetch('./' + id + '.json').then((r) => r.json());
</script>

{#await group}
	loading...
{:then group}
	<Page {...group} />
{:catch}
	oops
{/await}
