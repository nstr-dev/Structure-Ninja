<script lang="ts">
	import { currentBentoFocus, resizeBento } from '$lib/stores';
	import Braces from 'lucide-svelte/icons/braces';
	import GitFork from 'lucide-svelte/icons/git-fork';
	import TextSearch from 'lucide-svelte/icons/text-search';
</script>

<div>
	<div class="flex">
		<button
			class="flex h-[50px] w-[75px] items-center justify-center rounded-l-lg border-2 border-r-0 bg-background text-muted-foreground transition-all hover:bg-muted hover:text-secondary-foreground"
			onclick={() => resizeBento('left')}
			aria-label="Resize to left"><Braces /></button
		>
		<button
			aria-label="Resize to center left"
			class="h-[50px] w-[10px] border-[2px] border-x-[2px] bg-background transition-all hover:bg-muted"
			onclick={() => resizeBento('center-left')}
		></button>
		<button
			aria-label="Resize to center"
			class="flex h-[50px] w-[75px] items-center justify-center border-[2px] border-x-0 bg-background text-muted-foreground transition-all hover:bg-muted hover:text-secondary-foreground"
			onclick={() => resizeBento('center')}
		>
			<GitFork />
		</button>
		<button
			aria-label="Resize to center right"
			class="h-[50px] w-[10px] border-[2px] border-x-[2px] bg-background transition-all hover:bg-muted"
			onclick={() => resizeBento('center-right')}
		></button>
		<button
			aria-label="Resize to right"
			class="flex h-[50px] w-[75px] items-center justify-center rounded-r-lg border-[2px] border-l-0 bg-background text-muted-foreground transition-all hover:bg-muted hover:text-secondary-foreground"
			onclick={() => resizeBento('right')}
		>
			<TextSearch />
		</button>

		<div
			class="pointer-events-none absolute m-[2px] h-[46px] w-[73px] rounded-md border-[2px] border-white bg-gray-300 bg-opacity-25 opacity-40 transition-all"
			style="
            transform: translateX(
                {$currentBentoFocus === 'center'
				? '84px'
				: $currentBentoFocus === 'center-left'
					? '42px'
					: $currentBentoFocus === 'center-right'
						? '126px'
						: $currentBentoFocus === 'left'
							? '0px'
							: $currentBentoFocus === 'right'
								? '168px'
								: '0px'}
            );
        "
		></div>
	</div>
</div>
