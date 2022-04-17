<script lang="ts">
	import Button from '$lib/input/button.svelte';
	import Checkmark16 from 'carbon-icons-svelte/lib/Checkmark16';
	import Close16 from 'carbon-icons-svelte/lib/Close16';

	export let _id = "";
	//We'll replace these with endpoints too (maybe)
	export let state: 'signed' | 'opposed' | undefined = undefined;
	export let views = 0;

	//We actually don't want to await these because we want Promises
	
	export let viability = fetch('/petitions/' + _id + '/viability.json').then(result => result.text());
	export let signatures = fetch('/petitions/' + _id + '/viability.json').then(result => result.text());
</script>
<aside class="m-2 grid h-64 grid-cols-1 gap-4 text-xl md:pt-32">
  <div class="grid grid-cols-4 gap-2 md:grid-cols-3 lg:grid-cols-4">
    <div class="mr-4 bg-green-500 py-2 text-center font-mono">
      {#await viability}
        ...waiting
      {:then data}
        {data}
      {:catch error}
        ERROR
      {/await}
    </div>
    <div class="col-span-3 flex items-center">Viability</div>
    <div class="mr-4 bg-mean-green py-2 text-center font-mono">
      {#await signatures}
        ...waiting
      {:then data}
        {data}
      {:catch error}
        ERROR
      {/await}
    </div>
    <div class="col-span-3 flex items-center">Signatures</div>
  </div>
  {#if !state}
    <Button className="bg-mean-green"
      ><div class="flex w-full content-center items-center justify-between">
        <span>Sign this petition</span><Checkmark16 class="h-6 w-6" />
      </div>
    </Button>
    <Button className="bg-orange-600"
      ><div class="flex w-full content-center items-center justify-between">
        <span>Oppose this petition</span><Close16 class="h-6 w-6" />
      </div>
    </Button>
  {:else if state === 'signed'}
    <div class="text-green-600 dark:text-green-400 flex items-center">
      <Checkmark16 class="h-6 w-6 mr-2" /> You have signed this petition.
    </div>
  {:else if state === 'opposed'}
    <div class="text-orange-600 dark:text-orange-400 flex items-center">
      <Checkmark16 class="h-6 w-6 mr-2" /> You have opposed this petition.
    </div>
  {/if}
  <div class="text-base">
    {views} views
  </div>
</aside>
