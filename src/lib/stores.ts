import { writable, type Writable } from 'svelte/store';
import type { BentoFocus } from '../routes/+page.svelte';

export const currentBentoFocus: Writable<BentoFocus> = writable('left');

export function resizeBento(focus: BentoFocus) {
	currentBentoFocus.set(focus);
}
