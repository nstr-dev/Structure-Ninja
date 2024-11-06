<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	let count = 0;
	function incrementCount() {
		count++;
	}
</script>

<Button onclick={incrementCount}>
	<LoaderCircle class="mr-2 size-4 animate-spin" />
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</Button>
