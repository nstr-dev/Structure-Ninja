<script lang="ts">
	import { PUBLIC_SENTRY_DSN } from '$env/static/public';
	import Header from '$lib/components/header/header.svelte';
	import LoadingScreen from '$lib/components/loading-screen/loading-screen.svelte';
	import * as Sentry from '@sentry/browser';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	let { children } = $props();
	Sentry.init({
		dsn: PUBLIC_SENTRY_DSN,
		tracesSampleRate: 0.01
	});
</script>

<ModeWatcher />
<LoadingScreen />
<Header />
<main class="mt-16 flex flex-1 justify-center">
	{@render children()}
</main>
