<script lang="ts">
	import Laptop from 'lucide-svelte/icons/laptop';
	import Moon from 'lucide-svelte/icons/moon';
	import Sun from 'lucide-svelte/icons/sun';

	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { resetMode, setMode } from 'mode-watcher';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={buttonVariants({ variant: 'outline', size: 'icon' })}>
		<Sun class="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
		<Moon class="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
		<span class="sr-only">Toggle theme</span>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content align="end">
		<DropdownMenu.Group>
			<DropdownMenu.GroupHeading>Theme</DropdownMenu.GroupHeading>
			<DropdownMenu.Item onclick={() => setMode('light')}>
				<Sun class="mr-1 size-4" />Light</DropdownMenu.Item
			>
			<DropdownMenu.Item onclick={() => setMode('dark')}
				><Moon class="mr-1 size-4" />Dark</DropdownMenu.Item
			>
			<DropdownMenu.Item onclick={() => resetMode()}
				><Laptop class="mr-1 size-4" />System</DropdownMenu.Item
			>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
