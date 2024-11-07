<script lang="ts">
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { onMount } from 'svelte';
	let loading = true;

	onMount(() => {
		loading = false;
	});
</script>

{#if loading}
	<div class="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background">
		<div class="flex flex-col items-center gap-8">
			<h1 class="text-white-900 text-4xl font-bold tracking-tight sm:text-6xl">
				Structure
				<br />
				Ninja
			</h1>
			<LoaderCircle class="size-12 animate-spin" />
		</div>
	</div>
{/if}
