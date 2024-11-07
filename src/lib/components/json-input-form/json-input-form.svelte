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
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { parseAndValidateJsonReturnError } from '$lib/logic/jsonFactory';
	import { toastDismiss } from '$lib/utils';
	import Check from 'lucide-svelte/icons/check';
	import Eraser from 'lucide-svelte/icons/eraser';
	import History from 'lucide-svelte/icons/history';
	import MoveRight from 'lucide-svelte/icons/move-right';
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

	const form = superForm(data, {
		resetForm: false,
		validators: zodClient(formSchema),
		onUpdated: ({ form: f }) => {
			if (!f.valid) toast.error('Please fix the errors in your JSON.', toastDismiss);
			else {
				toast.success('JSON applied successfully.', toastDismiss);
				appliedJson = f.data.jsonInput;
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
			Use previous JSON</Button
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
		<h2>Live Preview</h2>
		<div class="max-h-[60vh] resize-y overflow-auto rounded-lg">
			<SuperDebug
				status={false}
				theme="default"
				data={parseAndValidateJsonReturnError($formData.jsonInput)}
			/>
		</div>
	{/if}
</form>
