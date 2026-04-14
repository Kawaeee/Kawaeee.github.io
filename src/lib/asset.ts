import { base } from '$app/paths';
import { chatConfig } from './data/config';

/** Resolve a static-asset path against the SvelteKit base. */
export function asset(path: string): string {
	const clean = path.replace(/^\/+/, '');
	return `${base}/${clean}`;
}

export const fallbackImage = () => asset(chatConfig.fallbackImagePath);
