<script>
	export let className = '';
	export let type = 'button';
	export let href = undefined;

	const classList =
		'y-2 inline-flex items-center rounded-md bg-slate-500 px-4 py-2 text-gray-5 ' + className;
</script>

{#if type === 'a'}
	<a {href} class={classList}><slot /></a>
{:else}
	<button class={classList}><slot /></button>
{/if}
