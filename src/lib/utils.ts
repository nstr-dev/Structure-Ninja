import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const toastDismiss = {
	action: {
		label: 'Alright.',
		onClick: () => void 0
	}
};
