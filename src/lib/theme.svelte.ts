import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

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
		},
		set(next: Theme) {
			apply(next);
		}
	};
}

export const theme = createTheme();
