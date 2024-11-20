<script lang="ts">
	import { createNinjaGraphFromJSON } from '$lib/logic/ninjaGraphFactory';
	import { currentlyAppliedJSON } from '$lib/stores';
	import { cn } from '$lib/utils';
	import { Anchor, Background, Node, Svelvet } from 'svelvet';

	const demoObject = {
		team: {
			lead: {
				name: 'Alice',
				role: 'Team Lead',
				experience: 10
			},
			members: [
				{
					name: 'Bob',
					role: 'Developer',
					experience: 5
				},
				{
					name: 'Charlie',
					role: 'Designer',
					experience: 3
				}
			],
			projects: [
				{
					name: 'Project X',
					status: 'In Progress'
				},
				{
					name: 'Project Y',
					status: 'Completed'
				}
			]
		},
		department: {
			name: 'Technology',
			head: {
				name: 'David',
				role: 'CTO'
			}
		}
	};

	let { class: className = '' } = $props();

	let appliedJSON = $state('');

	currentlyAppliedJSON.subscribe((value) => {
		if (value) appliedJSON = value;
	});

	let result = $derived(createNinjaGraphFromJSON(JSON.parse(appliedJSON || '{}')));
	let nodes = $derived(result.nodes);

	function getPosition(index: number, depth: number = 0) {
		return {
			x: depth * 200,
			y: index * -100
		};
	}
</script>

{#if appliedJSON}
	<div class={cn('mt-5 h-full w-full rounded-xl border-4', className)}>
		<Svelvet theme="nstr" locked id="svelvet-ninjagraph">
			{#each nodes as node, index (node.id)}
				<Node
					id={node.id}
					useDefaults
					position={getPosition(index, node.depth)}
					{...{
						...{}
						/* @ts-ignore */
					}}
					bgColor={'hsl(var(--secondary))'}
					borderColor={'hsl(var(--border))'}
					textColor={'hsl(var(--secondary-foreground))'}
				>
					<div class="node-wrapper flex flex-col-reverse gap-2">
						<div>
							{#if typeof node.value === 'object'}
								{#each Object.keys(node.value || {}) as key}
									<div class="flex items-center gap-1">
										<span class="font-bold">{key}:</span>
										<span>{node.value ? node.value[key] : ''}</span>
									</div>
								{/each}
							{:else if typeof node.value === 'string' || typeof node.value === 'number' || typeof node.value === 'boolean'}
								<div>{node.value}</div>
							{/if}

							{#if node.parentId}
								<div class="anchor-left">
									<Anchor
										direction="west"
										input
										id={node.id}
										connections={[[node.parentId, node.id]]}
									/>
								</div>
							{/if}

							{#if node.childrenIds}
								{#each Object.keys(node.childrenIds) as childId}
									<div class="mr-6 flex w-full items-center justify-between gap-5">
										<div class="flex items-center gap-1">
											<span class="font-bold">{childId}:</span>
											<span class="text-muted-foreground"></span>
										</div>
										<div class="anchor-right -mr-6">
											<Anchor direction="east" output id={node.childrenIds[childId]} />
										</div>
									</div>
								{/each}
							{/if}
						</div>
					</div></Node
				>
			{/each}
			<Background slot="background" bgColor="transparent" />
		</Svelvet>
	</div>
{:else}
	<div class="flex h-full w-full items-center justify-center">
		<p class="text-2xl text-gray-500">No JSON data to display</p>
	</div>
{/if}

<style>
	.node-wrapper {
		padding: 1rem;
	}

	.anchor-left {
		position: absolute;
		top: 5px;
		left: 5px;
	}

	.anchor-right {
		float: right;
		top: 0;
	}
</style>
