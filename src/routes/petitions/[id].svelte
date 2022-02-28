<!-- This file generates a detailed petition page -->
<script context="module">
	//The formatting of the page is defined in Page.svelte 
	import Page from '$lib/petition/Page.svelte';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch }) {
                const res = await fetch('./' + params.id + '.json');
		const petition = await res.json();
		console.log(petition);
                return {
                        props: { petition }
                };
        };
</script>

<script>
	export let petition;
</script>

<Page {...petition}/>
