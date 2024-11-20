<script lang="ts" module>
	import { z } from 'zod';
	export const formSchema = z.object({
		jsonInput: z.string().refine((value) => {
			try {
				JSON.parse(value);
				return true;
			} catch (_) {
				return false;
			}
		}, 'Your input is not valid JSON.')
	});
	export type FormSchema = typeof formSchema;
</script>

<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { parseAndValidateJsonReturnError } from '$lib/logic/jsonFactory';
	import { currentlyAppliedJSON } from '$lib/stores';
	import { toastDismiss } from '$lib/utils';
	import Check from 'lucide-svelte/icons/check';
	import Eraser from 'lucide-svelte/icons/eraser';
	import History from 'lucide-svelte/icons/history';
	import ListCheck from 'lucide-svelte/icons/list-check';
	import MoveRight from 'lucide-svelte/icons/move-right';
	import Radio from 'lucide-svelte/icons/radio';
	import { toast } from 'svelte-sonner';
	import SuperDebug, { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { BentoFocus } from '../../../routes/+page.svelte';

	let {
		form: data = $page.data.textarea,
		resizeBento,
		currentBentoFocus
	}: {
		form: SuperValidated<Infer<FormSchema>>;
		resizeBento: (focus: BentoFocus) => void;
		currentBentoFocus: BentoFocus;
	} = $props();

	let appliedJson = $state('');

	currentlyAppliedJSON.subscribe((json) => {
		appliedJson = json;
	});

	const form = superForm(data, {
		resetForm: false,
		validators: zodClient(formSchema),
		onUpdated: ({ form: f }) => {
			if (!f.valid) toast.error('Please fix the errors in your JSON.', toastDismiss);
			else {
				toast.success('JSON applied successfully.', toastDismiss);
				currentlyAppliedJSON.set(f.data.jsonInput);
				localStorage.setItem('previousJson', f.data.jsonInput);
			}
		}
	});

	function handleReset() {
		form.reset();
	}

	function handleNextStep() {
		resizeBento('center');
	}

	function handleLoadPrevious() {
		const previous: string | null = localStorage.getItem('previousJson');
		const backup = $formData.jsonInput;
		if (!previous) {
			toast.error('No previous JSON found.', toastDismiss);
			return;
		}

		if (previous === backup) {
			toast.error('JSON matches previous JSON.', toastDismiss);
			return;
		}
		$formData.jsonInput = previous;
		toast.success('Previous JSON loaded.', {
			action: {
				label: 'Undo',
				onClick: () => ($formData.jsonInput = backup)
			}
		});
	}

	const { form: formData, enhance } = form;
</script>

<form method="POST" class="space-y-6" use:enhance>
	<Form.Field {form} name="jsonInput">
		<Form.Control>
			{#snippet children({ props })}
				<h2 class="my-2">JSON Input</h2>
				<Form.Label>Paste your JSON-contents here:</Form.Label>
				<Textarea
					{...props}
					placeholder="Type or paste your JSON here 👈!"
					class="mono h-40 resize-y whitespace-pre"
					autofocus
					bind:value={$formData.jsonInput}
				/>
				<Form.Description>
					Please remove any comments as they are <a
						href="https://sentry.io/answers/comments-in-json/#:~:text=The%20short%20answer%20is%20no,which%20complicated%20the%20data%20format."
						target="_blank">not allowed in JSON.</a
					>
				</Form.Description>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<div class="flex flex-col-reverse flex-wrap-reverse justify-end gap-3 xl:flex-row">
		<Button variant="outline" onclick={handleReset}><Eraser class="mr-1 size-4" />Reset</Button>
		<Button variant="outline" onclick={handleLoadPrevious}>
			<History class="mr-1 size-4" />
			Restore previous JSON</Button
		>
		<Form.Button disabled={$formData.jsonInput === appliedJson} type="submit"
			><Check class="mr-1 size-4" />Apply</Form.Button
		>
	</div>
	{#if appliedJson && currentBentoFocus === 'left'}
		<div class="flex flex-row justify-end">
			<Button onclick={handleNextStep}><MoveRight class="mr-1 size-4" />Proceed to next step</Button
			>
		</div>
	{/if}
	{#if browser}
		<h2>Preview JSON data</h2>
		<Tabs.Root value="live" class="w-full">
			<Tabs.List>
				<Tabs.Trigger value="live"
					><Radio class="mr-1 size-4 text-muted-foreground" />Live Input</Tabs.Trigger
				>
				<Tabs.Trigger value="applied"
					><ListCheck class="mr-1 size-4 text-muted-foreground" />Applied JSON</Tabs.Trigger
				>
			</Tabs.List>
			<Tabs.Content value="live" class="space-y-3">
				<div class="pt-3">
					<span class="px-4 font-bold">Live</span>
					<span class="text-muted-foreground">
						Spot JSON errors easier before applying using this tab.
					</span>
				</div>
				<div class="max-h-[60vh] resize-y overflow-auto rounded-lg">
					<SuperDebug
						status={false}
						theme="default"
						data={parseAndValidateJsonReturnError($formData.jsonInput)}
					/>
				</div></Tabs.Content
			>
			<Tabs.Content value="applied" class="space-y-3">
				<div class="pt-3">
					<span class="px-4 font-bold">Applied</span>
					<span class="text-muted-foreground">
						Keep a consistent view of the data you are working with using this tab.
					</span>
				</div>
				<div class="max-h-[60vh] resize-y overflow-auto rounded-lg">
					<SuperDebug
						status={false}
						theme="default"
						data={parseAndValidateJsonReturnError(appliedJson)}
					/>
				</div></Tabs.Content
			>
		</Tabs.Root>
	{/if}
</form>
