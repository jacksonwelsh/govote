<!-- This file generates a detailed user page -->
<script context="module">
	//The formatting of the page is defined in Page.svelte
	import Page from '$lib/user/Page.svelte';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch }) {
		return {
			props: { id: params.id }
		};
	}
</script>

<script>
	export let id;

	const user = fetch('./' + id + '.json').then((r) => r.json());
</script>

{#await user}
	loading...
{:then user}
	<Page {...user} />
{:catch}
	oops
{/await}
