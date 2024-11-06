<script lang="ts">
	import { PUBLIC_SENTRY_DSN } from '$env/static/public';
	import * as Sentry from '@sentry/browser';
	import '../app.css';
	let { children } = $props();
	Sentry.init({
		dsn: PUBLIC_SENTRY_DSN,
		tracesSampleRate: 0.01
	});
</script>

{@render children()}
