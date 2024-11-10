<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import DoorOpen from 'lucide-svelte/icons/door-open';
	import MonitorSmartphone from 'lucide-svelte/icons/monitor-smartphone';

	let ignored = $state(
		typeof localStorage !== 'undefined' && localStorage.getItem('mobile-screen-ignored') === 'true'
	);

	function ignore() {
		localStorage.setItem('mobile-screen-ignored', 'true');
		ignored = true;
	}
</script>

{#if !ignored}
	<div
		class="fixed inset-0 z-30 flex flex-col items-center justify-center bg-background md:hidden [&_*]:transition-all"
	>
		<div class="flex flex-col items-center gap-8">
			<h1 class="text-white-900 text-5xl font-bold tracking-tight sm:text-6xl">
				Structure
				<br />
				Ninja
			</h1>
			<div class="flex max-w-52 items-center gap-3 sm:max-w-64">
				<MonitorSmartphone class="size-4 flex-shrink-0 sm:size-5" />
				<p class="text-sm text-muted-foreground sm:text-base">
					Please use a larger screen to view this app. It was designed for desktops and tablets.
				</p>
			</div>
			<Button onclick={ignore} variant="outline"
				><DoorOpen class="mr-1 size-4" />Ignore and continue</Button
			>
		</div>
	</div>
{/if}
