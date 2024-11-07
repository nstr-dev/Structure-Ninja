<script module lang="ts">
	export type BentoFocus = 'left' | 'right' | 'center' | 'equal' | 'center-left' | 'center-right';
</script>

<script lang="ts">
	import JsonInputForm, {
		type FormSchema
	} from '$lib/components/json-input-form/json-input-form.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
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

<div class="flex w-full justify-center p-8">
	<Resizable.PaneGroup direction="horizontal" class="rounded-lg border-4 transition-all ">
		<Resizable.Pane
			minSize={10}
			maxSize={80}
			bind:this={paneLeft}
			class="prose max-w-none p-4 transition-[flex] dark:prose-invert"
		>
			<h2>JSON Input</h2>
			<JsonInputForm {currentBentoFocus} {resizeBento} {form} />
		</Resizable.Pane>

		<Resizable.Handle class="w-1" withHandle />

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

		<Resizable.Handle withHandle class="w-1" />

		<Resizable.Pane bind:this={paneRight} minSize={10} maxSize={80} class="p-4 transition-[flex]"
			>Detail View</Resizable.Pane
		>
	</Resizable.PaneGroup>
</div>
