<script module lang="ts">
	export type BentoFocus = 'left' | 'right' | 'center' | 'equal' | 'center-left' | 'center-right';
</script>

<script lang="ts">
	import JsonInputForm, {
		type FormSchema
	} from '$lib/components/json-input-form/json-input-form.svelte';
	import NinjaGraph from '$lib/components/ninja-graph/ninja-graph.svelte';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import { currentBentoFocus, resizeBento } from '$lib/stores';
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

	let paneLeft: PaneAPI;
	let paneCenter: PaneAPI;
	let paneRight: PaneAPI;

	const doResize = (focus: BentoFocus) => {
		if (!paneLeft || !paneCenter || !paneRight) return;

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
	};

	currentBentoFocus.subscribe(doResize);

	onMount(() => {
		doResize('left');
	});
</script>

<div class="flex w-full flex-col items-center gap-4 p-8">
	<Resizable.PaneGroup direction="horizontal" class="rounded-lg border-4 transition-all">
		<Resizable.Pane
			minSize={10}
			maxSize={80}
			bind:this={paneLeft}
			class="prose max-w-none p-4 transition-[flex] dark:prose-invert"
		>
			<JsonInputForm currentBentoFocus={$currentBentoFocus} {resizeBento} {form} />
		</Resizable.Pane>

		<Resizable.Handle class="-z-10 w-1" draggable={false} />

		<Resizable.Pane bind:this={paneCenter} minSize={10} maxSize={80} class="p-4 transition-[flex]">
			<NinjaGraph />
		</Resizable.Pane>

		<!-- <Resizable.Handle withHandle class="w-1" /> -->
		<Resizable.Handle class="-z-10 w-1" draggable={false} />

		<Resizable.Pane bind:this={paneRight} minSize={10} maxSize={80} class="p-4 transition-[flex]"
			>Detail View</Resizable.Pane
		>
	</Resizable.PaneGroup>
</div>
