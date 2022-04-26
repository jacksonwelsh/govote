<script>
  import { createEventDispatcher } from 'svelte';

  import { v4 as uuid } from 'uuid';

  export let label = undefined;
  export let hint = undefined;
  export let value = '';
  export let type = 'text';
  export let autocomplete = undefined;
  export let required = false;

  const dispatch = createEventDispatcher();
  const onFocus = () => dispatch('focus');

  const handleInput = (event) => (value = event.target.value);

  const labelId = uuid();
</script>

<div class="my-2">
  <label for={labelId}>
    {label}
    <input
      id={labelId}
      on:input={handleInput}
      on:focus={onFocus}
      {type}
      {autocomplete}
      {required}
      class="w-full rounded-md focus:border-slate-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
    />
  </label>
  {#if hint} <p class="mt-1 text-sm text-slate-400">{hint}</p>{/if}
</div>
