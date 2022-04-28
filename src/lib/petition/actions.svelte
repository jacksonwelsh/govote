<script lang="ts">
  import Button from '$lib/input/button.svelte';
  import Checkmark16 from 'carbon-icons-svelte/lib/Checkmark16';
  import Close16 from 'carbon-icons-svelte/lib/Close16';

  export let _id = '';
  //We'll replace these with endpoints too (maybe)
  export let state: number | undefined = undefined;
  export let views = 0;

  //We actually don't want to await these because we want Promises

  const getVia = () =>
    fetch('/petitions/' + _id + '/viability.json').then((result) => result.json());
  export let viability = getVia();

  const getState = async () => {
	return await fetch('/petitions/' + _id + '/signed.json?idx=0').then((result) => result.json()).then((result) => {
		if(typeof result == 'object') return undefined;
		//console.log(result);
		return result;
	});
  };

  getState().then((bruh) => {
	//console.log(bruh);
	state = bruh
  });

  const getSignatures = () => fetch('/petitions/' + _id + '/signatures.json?idx=0').then((result) => result.json()).then((result) => {
	return result.length;
  });
  export let signatures = getSignatures();

  const signPositive = () => {
    console.log('pos!');
    fetch(`/petitions/${_id}/vote`, {
      method: 'POST',
      body: JSON.stringify({
        voterId: '626ac42eba40e6adac4eec2f',
        answerIndex: 0,
        representative: '626ac42eba40e6adac4eec2f',
      }),
    }).then(() => {
      state = 0;
      viability = getVia();
      signatures = getSignatures();
    });
  };
  const signNegative = () => {
    fetch(`/petitions/${_id}/vote`, {
      method: 'POST',
      body: JSON.stringify({
        voterId: '626ac42eba40e6adac4eec2f',
        answerIndex: 1,
        representativeId: '626ac42eba40e6adac4eec2f',
      }),
    }).then(() => {
      state = 1;
      viability = getVia();
      signatures = getSignatures();
    });
  };
</script>

<aside class="m-2 grid h-64 grid-cols-1 gap-4 text-xl md:pt-32">
  <div class="grid grid-cols-4 gap-2 md:grid-cols-3 lg:grid-cols-4">
    <div class="mr-4 bg-green-500 py-2 text-center font-mono">
      {#await viability}
        ...waiting
      {:then data}
        {data.toFixed(1)}
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
  {#if state === undefined}
    <Button className="bg-mean-green"
      ><div
        class="flex w-full content-center items-center justify-between"
        on:click={() => signPositive()}
      >
        <span>Sign this petition</span><Checkmark16 class="h-6 w-6" />
      </div>
    </Button>
    <Button className="bg-orange-600"
      ><div class="flex w-full content-center items-center justify-between" on:click={signNegative}>
        <span>Oppose this petition</span><Close16 class="h-6 w-6" />
      </div>
    </Button>
  {:else if state == 0}
    <div class="text-green-600 dark:text-green-400 flex items-center">
      <Checkmark16 class="h-6 w-6 mr-2" /> You have signed this petition.
    </div>
  {:else if state == 1}
    <div class="text-orange-600 dark:text-orange-400 flex items-center">
      <Checkmark16 class="h-6 w-6 mr-2" /> You have opposed this petition.
    </div>
  {/if}
  <div class="text-base">
    {views} views
  </div>
</aside>
