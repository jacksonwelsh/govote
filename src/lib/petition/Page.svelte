<script>
  import showdown from 'showdown';

  export let _id = '';
  export let title = _id || '';
  export let description = '';

  const converter = new showdown.Converter();

  const html = converter.makeHtml(description);
</script>

<div
  class="container prose prose-lg prose-invert mx-auto mt-4 prose-ol:list-decimal prose-ul:list-disc"
>
  <h1 class="my-2">{title}</h1>
  <div class="">
    {@html html}
  </div>
</div>
