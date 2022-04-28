<script>
  import Card from '$lib/user/card.svelte';
  export let _id;
  const signatures = fetch('/petitions/' + _id + '/signatures.json')
    .then((signaturesResponse) => signaturesResponse.json())
    .then((signaturesArray) => {
      console.log(signaturesArray);
      //Request all users for now until we get cookies sorted out
      return fetch(
        '/users/search.json?' +
          new URLSearchParams({ query: JSON.stringify({ _id: { $in: signaturesArray } }) })
      ).then((searchResult) => searchResult.json());
    });
</script>

<div class="flex h-full w-full flex-grow flex-col">
  <section class="mx-auto my-6 px-2 md:px-0">
    {#await signatures}
      <h2 class="mb-4">Loading signers...</h2>
    {:then signatures}
      <h2 class="mb-4">Signers include:</h2>
      <div class="grid grid-cols-3 gap-4">
        {#each signatures as signer}
          <div>
            {signer.voterid}
          </div>
        {/each}
      </div>
    {:catch error}
      GoFail. :(
    {/await}
  </section>
</div>
