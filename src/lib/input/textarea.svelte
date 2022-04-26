<script>
  import { v4 } from '@lukeed/uuid';

  import { createEventDispatcher } from 'svelte';
  import { v4 as uuid } from 'uuid';

  export let label = undefined;
  export let hint = undefined;
  export let rows = 6;

  export let value = '';

  const dispatch = createEventDispatcher();
  const onFocus = () => dispatch('focus');

  const labelId = uuid();
</script>

<form class="my-2">
  <label for={labelId}>
    {label}
    <textarea
      id={labelId}
      bind:value
      on:focus={onFocus}
      class="w-full rounded-md focus:border-slate-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
      {rows}
    />
  </label>
  {#if hint} <p class="text-sm text-slate-400">{hint}</p>{/if}
</form>
