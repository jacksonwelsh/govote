<!-- This file generates a detailed petition page -->
<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export const load = async ({ params, query }) => {
		//I think since we named the thing [id] then the id gets stored in params.id
		const petition = this.fetch("blog/" + params.id + ".json").then(r => r.json());
		return {
			petition: petition
		}
	};
</script>

<script>
	//The formatting of the page is defined in Page.svelte 
	import Page from './Page.svelte';
	export let petition;
</script>

<Page {...petition}/>

{id}
