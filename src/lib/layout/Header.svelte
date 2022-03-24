<script lang="ts">
	import Button from '$lib/input/button.svelte';
	import Add16 from 'carbon-icons-svelte/lib/Add16';
</script>

<nav class="flex w-full justify-between bg-slate-900 py-3 px-4 text-slate-50 shadow-lg">
	<a href="/">
		<img class="h-8 text-red-500" src="/govote-dark.svg" alt="GoVote" />
	</a>
	<div class="flex items-center">
		<Button type="a" href="/create" className="h-10">
			<Add16 class="mr-2" /> Create a petition
		</Button>
		<a href="/" class="mx-4">Home</a>
		<a href="/users" class="mx-4">Users</a>
		<a href="/groups" class="mx-4">Groups</a>
		<a href="/about" class="mx-4">About</a>
	</div>
</nav>
