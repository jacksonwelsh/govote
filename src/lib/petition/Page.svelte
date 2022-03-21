<script>
  import showdown from 'showdown';
  import ActionPanel from './actions.svelte';

  export let _id = '';
  export let title = _id || '';
  export let description = '';

  const converter = new showdown.Converter();

  const html = converter.makeHtml(description);
</script>

<article class="grid grid-cols-1 md:grid-cols-4 container mx-auto">
  <div
    class="prose prose-lg dark:prose-invert col-span-3 mx-auto mt-4 prose-h1:text-4xl prose-ol:list-decimal prose-ul:list-disc"
  >
    <h1 class="mt-2 mb-10 !text-6xl">{title}</h1>
    <div class="">
      {@html html}
    </div>
  </div>

  <ActionPanel />
</article>
