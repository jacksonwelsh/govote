<script>
  export let _id = '';
  export let title = _id || '';
  export let description = '';
</script>

<div class="prose container mx-auto mt-4">
  <h1 class="my-2">{title}</h1>
  {description}
</div>
