<script module lang="ts">
	export type BentoFocus = 'left' | 'right' | 'center' | 'equal' | 'center-left' | 'center-right';
</script>

<script lang="ts">
	import JsonInputForm, {
		type FormSchema
	} from '$lib/components/json-input-form/json-input-form.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import Braces from 'lucide-svelte/icons/braces';
	import GitFork from 'lucide-svelte/icons/git-fork';
	import TextSearch from 'lucide-svelte/icons/text-search';
	import type { PaneAPI } from 'paneforge';
	import { onMount } from 'svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';

	let form: SuperValidated<Infer<FormSchema>> = {
		id: '',
		valid: false,
		posted: false,
		data: {
			jsonInput: ''
		},
		errors: {}
	};

	let currentBentoFocus: BentoFocus = $state('left');

	let paneLeft: PaneAPI;
	let paneCenter: PaneAPI;
	let paneRight: PaneAPI;

	function resizeBento(focus: BentoFocus) {
		currentBentoFocus = focus;

		if (focus === 'center') {
			paneLeft.resize(15);
			paneCenter.resize(70);
			paneRight.resize(15);
		}

		if (focus === 'left') {
			paneLeft.resize(70);
			paneCenter.resize(15);
			paneRight.resize(15);
		}

		if (focus === 'right') {
			paneLeft.resize(15);
			paneCenter.resize(15);
			paneRight.resize(70);
		}

		if (focus === 'equal') {
			paneLeft.resize(33.3);
			paneCenter.resize(33.3);
			paneRight.resize(33.3);
		}

		if (focus === 'center-left') {
			paneLeft.resize(42.5);
			paneCenter.resize(42.5);
			paneRight.resize(15);
		}

		if (focus === 'center-right') {
			paneLeft.resize(15);
			paneCenter.resize(42.5);
			paneRight.resize(42.5);
		}
	}

	onMount(() => {
		resizeBento('left');
	});
</script>

<div class="flex w-full flex-col items-center gap-4 p-8">
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
                {currentBentoFocus === 'center'
					? '84px'
					: currentBentoFocus === 'center-left'
						? '42px'
						: currentBentoFocus === 'center-right'
							? '126px'
							: currentBentoFocus === 'left'
								? '0px'
								: currentBentoFocus === 'right'
									? '168px'
									: '0px'}
            );
        "
			></div>
		</div>
	</div>

	<Resizable.PaneGroup direction="horizontal" class="rounded-lg border-4 transition-all">
		<Resizable.Pane
			minSize={10}
			maxSize={80}
			bind:this={paneLeft}
			class="prose max-w-none p-4 transition-[flex] dark:prose-invert"
		>
			<JsonInputForm {currentBentoFocus} {resizeBento} {form} />
		</Resizable.Pane>

		<Resizable.Handle class="-z-10 w-1" draggable={false} />

		<Resizable.Pane bind:this={paneCenter} minSize={10} maxSize={80} class="p-4 transition-[flex]"
			>Graph View
			<div>
				<Button onclick={() => resizeBento('center')}>Center</Button>
				<Button onclick={() => resizeBento('left')}>Left</Button>
				<Button onclick={() => resizeBento('right')}>Right</Button>
				<Button onclick={() => resizeBento('equal')}>Equal</Button>
				<Button onclick={() => resizeBento('center-left')}>Center-Left</Button>
				<Button onclick={() => resizeBento('center-right')}>Center-Right</Button>
			</div>
		</Resizable.Pane>

		<!-- <Resizable.Handle withHandle class="w-1" /> -->
		<Resizable.Handle class="-z-10 w-1" draggable={false} />

		<Resizable.Pane bind:this={paneRight} minSize={10} maxSize={80} class="p-4 transition-[flex]"
			>Detail View</Resizable.Pane
		>
	</Resizable.PaneGroup>
</div>
