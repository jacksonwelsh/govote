<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export const load = async ({ params }) => {
		return {
			props: {
				id: params.id
			}
		};
	};
</script>

<script>
	export let id;
</script>

{id}
