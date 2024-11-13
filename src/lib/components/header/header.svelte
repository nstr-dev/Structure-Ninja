<script lang="ts">
	import { goto } from '$app/navigation';
	import Minimap from '$lib/components/minimap/minimap.svelte';
	import ThemeToggle from '$lib/components/theme-toggle/theme-toggle.svelte';
</script>

<header
	class="fixed top-0 z-50 flex h-16 w-full max-w-full flex-1 items-center justify-between px-5 backdrop-blur-[20px]"
>
	<button
		class="prose flex cursor-pointer items-center gap-5 opacity-80 transition-all dark:prose-invert hover:translate-x-3 hover:rotate-1 hover:opacity-100"
		on:click={() => goto('/')}
	>
		<img
			src="/favicon.png"
			alt="Structure Ninja"
			class="m-0 mt-1 inline-block h-14 w-14 align-middle dark:invert"
		/>
		<h1 class="m-0 hidden whitespace-nowrap align-middle sm:inline-block">Structure Ninja</h1>
	</button>

	<div class="flex items-center gap-14">
		<div class="scale-[82%]">
			<Minimap />
		</div>
		<div class="flex flex-row-reverse items-center gap-3">
			<ThemeToggle />
		</div>
	</div>
</header>
