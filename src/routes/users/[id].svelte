<!-- This file generates a detailed user page -->
<script context="module">
	//The formatting of the page is defined in Page.svelte 
	import Page from '$lib/user/Page.svelte';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch }) {
                const res = await fetch('./' + params.id + '.json');
		const user = await res.json();
		console.log(user);
                return {
                        props: { user }
                };
        };
</script>

<script>
	export let user;
</script>

<Page {...user}/>
