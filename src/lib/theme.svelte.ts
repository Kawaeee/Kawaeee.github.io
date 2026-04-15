/**
 * Runes-based theme singleton.
 *
 * The inline boot script in `src/app.html` sets
 * `document.documentElement.dataset.theme` before the Svelte bundle loads so
 * there's no light-mode flash on dark-preferring devices. `initial()` below
 * reads that attribute so the client state matches what the user is already
 * seeing. Flipping theme writes back to both the attribute and `localStorage`;
 * CSS variables in `palette.css` are keyed off `[data-theme='…']`.
 */
import { browser } from '$app/environment';

/** The two themes this site supports. */
export type Theme = 'light' | 'dark';

/**
 * Resolve the starting theme:
 * 1. The `data-theme` already on `<html>` (set by the app.html boot script).
 * 2. The user's OS preference (`prefers-color-scheme`).
 * 3. Light, as a last resort (and always during SSR).
 */
function initial(): Theme {
	if (!browser) return 'light';
	const attr = document.documentElement.dataset.theme;
	if (attr === 'light' || attr === 'dark') return attr;
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function createTheme() {
	let current = $state<Theme>(initial());

	function apply(next: Theme) {
		current = next;
		if (browser) {
			document.documentElement.dataset.theme = next;
			try {
				localStorage.setItem('theme', next);
			} catch {
				// ignore storage errors (private mode, etc.)
			}
		}
	}

	return {
		get value() {
			return current;
		},
		toggle() {
			apply(current === 'dark' ? 'light' : 'dark');
		}
	};
}

/**
 * App-wide theme singleton. Read `theme.value` in components; call
 * `theme.toggle()` from the `ThemeToggle` button.
 */
export const theme = createTheme();
