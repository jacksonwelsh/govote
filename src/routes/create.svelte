<script>
	import Banner from '$lib/Banner.svelte';
	import Text from '$lib/input/text.svelte';
	import TextArea from '$lib/input/textarea.svelte';
	import Select from '$lib/input/select.svelte';

	let subject = '';
	let description = '';
	let college = 'Select a college...';
	let chars = 0;

	$: chars = description.trim().length;
</script>

<Banner>
	<div class="my-auto">
		<h1 class="my-2">Create a petition</h1>
		<p>Now's your time to shine. Fill out this simple form to add your petition to GoVote!</p>
	</div>
</Banner>

<section class="container mx-auto grid grid-cols-1 gap-12 md:grid-cols-2">
	<form>
		<Text
			bind:value={subject}
			label="Title"
			hint="This is your rallying cry! Make it descriptive and unique, but don't make it too long."
		/>
		<TextArea
			bind:value={description}
			label="Description"
			hint={`${chars}/1000 character minimum`}
		/>
		<Select
			bind:value={college}
			label="Select a college (optional)"
			options={['College of Engineering', 'College of Music', 'College of Science']}
		/>
		{@debug college}
	</form>
</section>
