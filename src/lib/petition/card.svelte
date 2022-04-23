<script lang="ts">
	import { writable } from 'svelte/store';
	export let _id = '';
	export let title = _id || '';
	export let desc = '';
	const formattedDesc = desc.substring(0, 255) + '...';
	
	const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
	function redToGreen(value: number, max: number = 1.0, opacity: Pick<number, string> = .25): string{
		const maxColorValue = 256;
		//Map the range slider value to 1.0 to 0
		const valueMapped = value * (maxColorValue / max);
		let red = clamp((maxColorValue*2)-(2.0*valueMapped), 0, maxColorValue);
		let green = clamp((2.0*valueMapped), 0, maxColorValue);
		console.log(value, max);
		return "rgba(" + red + ", " + green + ", 0, " + opacity + ")";
	}
	export const viabilityColor = new writable("rgba(0, 0, 255, .1)");
	fetch('/petitions/' + _id + '/viability.json').then(async result => {
		const data = await result.json();
		const color = redToGreen(data);
		viabilityColor.set(color);
	});
</script>
<a href={`/petitions/${_id}`}>
	<div
		class="group h-full rounded-lg bg-white p-4 shadow-lg transition-all hover:shadow-2xl dark:bg-slate-800"
		style:background-color={$viabilityColor}
	>
		<h3 class="group-hover:text-black group-hover:underline dark:group-hover:text-white">
			{title}
		</h3>
		<p
			class="text-slate-600 transition-colors group-hover:text-slate-800 dark:text-slate-300 group-hover:dark:text-gray-100"
		>
			{formattedDesc}
		</p>
	</div>
</a>
