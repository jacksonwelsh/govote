<!-- This file generates a detailed group page -->
<script context="module">
	//The formatting of the page is defined in Page.svelte 
	import Page from '$lib/group/Page.svelte';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch }) {
                const res = await fetch('./' + params.id + '.json');
		const group = await res.json();
		console.log(group);
                return {
                        props: { group }
                };
        };
</script>

<script>
	export let group;
</script>

<Page {...group}/>
