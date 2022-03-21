<script lang="ts">
  import { colleges } from '$lib/constants';
  import Banner from '$lib/Banner.svelte';
  import Text from '$lib/input/text.svelte';
  import TextArea from '$lib/input/textarea.svelte';
  import Select from '$lib/input/select.svelte';
  import Rocket16 from 'carbon-icons-svelte/lib/Rocket16';

  let title = '';
  let description = '';
  let college = 'Select a college...';
  let chars = 0;

  let focusedField = '';

  const onFocus = () => {
    console.log({ focusedField });
    focusedField = 'title';
  };

  const onSubmit = () => {
    fetch('/petitions/create', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        college:
          college === 'Select a college...'
            ? undefined
            : Object.entries(colleges).find(([key, value]) => {
                console.log(value);
                return value === college;
              })[0], // get college ID from name
      }),
    })
      .then(async (r) => r.json())
      .then((r) => {
        if (r.errors) {
          // todo: show errors in UI
          console.error(r.errors);
        } else {
          window.location.href = `/petitions/${r.id}`;
        }
      });
  };

  $: chars = description.trim().length;
</script>

<Banner>
  <div class="my-auto">
    <h1 class="my-2">Create a petition</h1>
    <p>
      Now's your time to shine. Fill out this simple form to add your petition to GoVote! {college}
    </p>
  </div>
</Banner>

<section class="container mx-auto grid grid-cols-1 gap-12 px-2 lg:grid-cols-2 lg:px-0">
  <form on:submit|preventDefault={onSubmit}>
    <Text
      bind:value={title}
      on:focus={onFocus}
      label="Title"
      hint="This is your rallying cry! Make it descriptive and unique, but don't make it too long."
    />
    <TextArea
      bind:value={description}
      on:focus={() => (focusedField = 'description')}
      label="Description"
      hint={`${chars}/1000 character minimum`}
    />
    <Select
      bind:value={college}
      on:focus={() => (focusedField = 'stakeholder')}
      label="Select a college (optional)"
      options={Object.values(colleges)}
    />
    <button
      type="submit"
      class="float-right my-2 inline-flex items-center rounded-md bg-slate-500 px-4 py-2 text-slate-50"
    >
      <Rocket16 class="mr-2" /> Submit</button
    >
  </form>
  <aside class="text-slate-900 dark:text-slate-50  lg:text-slate-500 dark:lg:text-slate-400">
    <div
      class={[
        focusedField === 'title' ? 'dark:text-slate-50 text-slate-900' : '',
        'my-6',
        'transition-all',
      ].join(' ')}
    >
      <h3>Title Tips</h3>
      <p>
        A great petition starts with a great title! This is how you draw people in, so make sure
        it's a good one. Make it actionable- something that summarizes what you hope to accomplish
        with your petition.
      </p>
      <p>Avoid all-caps&#8212;you don't want to yell at your classmates!</p>
    </div>
    <div
      class={[
        focusedField === 'description' ? 'dark:text-slate-50 text-slate-900' : '',
        'my-6',
        'transition-all',
      ].join(' ')}
    >
      <h3>Nailing the Description</h3>
      <p>
        The description is where the magic really happens. It needs to be detailed enough to outline
        exactly what you want to happen because of this petition. On paper, this would be the letter
        your fellow students would be signing to agree with.
      </p>
      <p>
        You need to type at least 1000 characters (about 150 words), but you are encouraged to write
        more. A petition that's not detailed enough is much less likely to achieve what you want,
        and may be slower to get votes. It also helps draw students to your cause if you can explain
        why this is important to you.
      </p>
    </div>
    <div
      class={[
        focusedField === 'stakeholder' ? 'dark:text-slate-50 text-slate-900' : '',
        'my-6',
        'transition-all',
      ].join(' ')}
    >
      <h3>Tagging Decision-Makers</h3>
      <p>
        Tagging design makers is what makes your petition actionable. This is who we'll send a
        report on the petition to, indication that there is significant student support for an
        action (we'll include your Description as a description of the issue).
      </p>
    </div>
  </aside>
</section>
