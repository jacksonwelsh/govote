<script context="module" lang="ts">
	import Add16 from 'carbon-icons-svelte/lib/Add16';
	import Banner from '$lib/Banner.svelte';
	import Card from '$lib/petition/card.svelte';
	import { v4 } from '@lukeed/uuid';
	export const prerender = true;
	const cards = [
		{
			title: 'Abolish the parking department',
			desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis nisl rhoncus mattis rhoncus urna neque. Praesent elementum facilisis leo vel fringilla est ullamcorper. Suspendisse potenti nullam ac tortor. Morbi leo urna molestie at elementum. Faucibus a pellentesque sit amet porttitor. Congue mauris rhoncus aenean vel elit. Aliquam id diam maecenas ultricies mi eget mauris. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Fames ac turpis egestas maecenas pharetra convallis posuere morbi.'
		},
		{
			title: 'Another Great Petition',
			desc: 'Eget nunc scelerisque viverra mauris in aliquam sem fringilla. Dictum at tempor commodo ullamcorper a. Fringilla ut morbi tincidunt augue interdum velit. Aliquam faucibus purus in massa tempor nec feugiat nisl pretium. Convallis convallis tellus id interdum velit laoreet id donec. Felis eget nunc lobortis mattis aliquam faucibus. Enim blandit volutpat maecenas volutpat blandit aliquam. Lectus proin nibh nisl condimentum id venenatis a condimentum. Euismod in pellentesque massa placerat duis ultricies. Amet cursus sit amet dictum. Vitae aliquet nec ullamcorper sit amet risus nullam. Tellus orci ac auctor augue mauris augue neque gravida. Vehicula ipsum a arcu cursus vitae congue mauris. Ultricies integer quis auctor elit. Et malesuada fames ac turpis egestas maecenas. Eget mi proin sed libero enim sed. Orci dapibus ultrices in iaculis. Nisi est sit amet facilisis magna etiam tempor orci. Morbi tristique senectus et netus et malesuada fames. Arcu odio ut sem nulla pharetra diam sit.'
		},
		{
			title: 'Make the Union more welcoming',
			desc: 'Nec dui nunc mattis enim ut tellus elementum sagittis vitae. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Elementum sagittis vitae et leo duis ut diam quam nulla. Fermentum et sollicitudin ac orci phasellus egestas tellus. Felis imperdiet proin fermentum leo vel. Consectetur a erat nam at lectus. Eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor. Et malesuada fames ac turpis egestas maecenas pharetra. Amet tellus cras adipiscing enim. Ultricies mi eget mauris pharetra et ultrices neque. Tempor orci eu lobortis elementum nibh tellus molestie nunc. Non curabitur gravida arcu ac tortor dignissim convallis. Purus ut faucibus pulvinar elementum integer enim. Senectus et netus et malesuada.'
		},
		{
			title: 'Make Physics 1710 (Mechanics) Easier',
			desc: 'Enim praesent elementum facilisis leo vel fringilla est. Leo a diam sollicitudin tempor id eu. Pretium aenean pharetra magna ac. Bibendum neque egestas congue quisque egestas diam in. Posuere lorem ipsum dolor sit amet. Condimentum vitae sapien pellentesque habitant morbi. Rhoncus mattis rhoncus urna neque viverra. Et netus et malesuada fames. Lorem donec massa sapien faucibus et molestie ac feugiat sed. Suspendisse faucibus interdum posuere lorem ipsum. Cursus vitae congue mauris rhoncus aenean. Ultrices gravida dictum fusce ut placerat orci. Bibendum est ultricies integer quis auctor elit. Eu volutpat odio facilisis mauris sit amet massa vitae. Pretium aenean pharetra magna ac placerat vestibulum. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Pretium quam vulputate dignissim suspendisse in est ante in. Nunc sed id semper risus in hendrerit gravida rutrum. Turpis massa tincidunt dui ut ornare lectus sit.'
		},
		{
			title: 'Computer Science majors should not have to take EENG 2710!',
			desc: 'Enim sed faucibus turpis in. Euismod lacinia at quis risus sed vulputate odio ut enim. Egestas quis ipsum suspendisse ultrices. Eget aliquet nibh praesent tristique. Iaculis eu non diam phasellus vestibulum lorem sed risus. Laoreet non curabitur gravida arcu ac tortor dignissim. Ultrices sagittis orci a scelerisque purus. Leo integer malesuada nunc vel risus commodo viverra maecenas accumsan. Mattis rhoncus urna neque viverra justo nec ultrices dui. Lobortis scelerisque fermentum dui faucibus. Eget sit amet tellus cras adipiscing. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin libero. Et malesuada fames ac turpis egestas integer. Urna neque viverra justo nec. Faucibus scelerisque eleifend donec pretium vulputate sapien nec. Aliquet risus feugiat in ante metus dictum.'
		},
		{
			title: 'Add more night/weekend classes',
			desc: 'Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Enim sit amet venenatis urna cursus eget. Interdum velit euismod in pellentesque. Nisi est sit amet facilisis magna etiam tempor orci eu. Vel elit scelerisque mauris pellentesque pulvinar. Consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat. A erat nam at lectus urna duis convallis convallis tellus. Vel fringilla est ullamcorper eget nulla. Ultrices in iaculis nunc sed augue lacus viverra. Diam quam nulla porttitor massa id neque aliquam vestibulum morbi. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Ullamcorper morbi tincidunt ornare massa. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor. Dictum non consectetur a erat nam at lectus urna. Eu mi bibendum neque egestas congue quisque egestas. Leo vel orci porta non pulvinar neque laoreet suspendisse interdum. Eget nunc scelerisque viverra mauris in aliquam. Proin fermentum leo vel orci porta non pulvinar neque laoreet. Felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices. Aliquam ultrices sagittis orci a scelerisque purus.'
		},
		{
			title: 'Change the requriements for students graduating Summa Cum Laude',
			desc: 'Vel quam elementum pulvinar etiam. Sodales ut etiam sit amet nisl purus. Urna id volutpat lacus laoreet non curabitur gravida arcu. At volutpat diam ut venenatis tellus. Sit amet tellus cras adipiscing enim eu turpis. Feugiat nisl pretium fusce id velit ut tortor pretium viverra. Enim tortor at auctor urna nunc id cursus metus aliquam. Quisque id diam vel quam elementum pulvinar etiam non quam. Vitae proin sagittis nisl rhoncus mattis rhoncus urna. A lacus vestibulum sed arcu non odio euismod lacinia. Sapien eget mi proin sed libero enim sed faucibus turpis.'
		},
		{
			title: 'Make a new DP parking permit only valid for Discovery Park',
			desc: 'Sem et tortor consequat id porta nibh venenatis. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et. Sed tempus urna et pharetra pharetra massa massa ultricies. Dignissim sodales ut eu sem integer vitae justo eget magna. Vel orci porta non pulvinar. Faucibus interdum posuere lorem ipsum dolor sit. In nulla posuere sollicitudin aliquam ultrices. Dictum non consectetur a erat nam at lectus. Pretium viverra suspendisse potenti nullam ac tortor. Semper viverra nam libero justo laoreet. Penatibus et magnis dis parturient. Elementum nibh tellus molestie nunc non blandit massa enim nec. Morbi enim nunc faucibus a pellentesque sit amet. Sit amet venenatis urna cursus. Tortor pretium viverra suspendisse potenti nullam. Blandit aliquam etiam erat velit scelerisque in dictum. Integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Quam quisque id diam vel.'
		},
		{
			title: 'Require students to wear masks at social gatherings',
			desc: 'Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Eu facilisis sed odio morbi quis commodo odio aenean. Amet consectetur adipiscing elit ut. Gravida neque convallis a cras semper. Tortor id aliquet lectus proin nibh nisl condimentum id. Tempor orci eu lobortis elementum. Fringilla urna porttitor rhoncus dolor purus. Eros in cursus turpis massa. Ut sem nulla pharetra diam sit amet nisl. Amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor. Suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse. Ultricies tristique nulla aliquet enim tortor at auctor urna nunc. Nulla aliquet porttitor lacus luctus accumsan tortor posuere. Mollis aliquam ut porttitor leo a. Sed tempus urna et pharetra.'
		},
		{
			title: 'Update myUNT to show an itemized bill for each semester',
			desc: 'Felis imperdiet proin fermentum leo vel orci porta. Vel eros donec ac odio tempor orci dapibus. Laoreet sit amet cursus sit amet dictum sit amet justo. Malesuada fames ac turpis egestas sed tempus urna. Ut morbi tincidunt augue interdum velit. Purus gravida quis blandit turpis cursus in hac habitasse. Magna fermentum iaculis eu non diam phasellus vestibulum lorem. Ipsum dolor sit amet consectetur. A cras semper auctor neque vitae tempus quam. Id venenatis a condimentum vitae sapien pellentesque habitant. Lobortis mattis aliquam faucibus purus in massa tempor nec feugiat. Tellus cras adipiscing enim eu turpis. Ut diam quam nulla porttitor massa id neque aliquam. Massa id neque aliquam vestibulum. Ornare suspendisse sed nisi lacus sed viverra tellus in hac. Commodo odio aenean sed adipiscing. Purus semper eget duis at tellus at urna.'
		}
	];
</script>

<script lang="ts">
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="flex h-full w-full flex-grow flex-col">
	<Banner>
		<div class="my-auto">
			<h1 class="my-2">Welcome to GoVote</h1>
			<p>Create, sign, and view petitions from your fellow students.</p>
		</div>
	</Banner>
	<section class="container mx-auto my-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each cards as petition}
			<Card {...petition} id={v4()} />
		{/each}
	</section>
</div>
