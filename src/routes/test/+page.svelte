<script lang="ts">
	import { createNinjaGraphFromJSON } from '$lib/logic/ninjaGraphFactory';
	import { Anchor, Node, Svelvet } from 'svelvet';

	// Demo dataset
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

	const result = createNinjaGraphFromJSON(demoObject);
	const nodes = result.nodes;

	console.log(result);

	function getRandomPosition(index: number, depth: number = 1) {
		return {
			x: depth * 200,
			y: index * -100
		};
	}
</script>

<div class="mt-5 h-[80svh] w-[80vw]">
	<Svelvet fitView locked controls id="svelvet-ninjagraph">
		{#each nodes as node, index (node.id)}
			<Node id={node.id} useDefaults position={getRandomPosition(index, node.depth)}>
				<div class="node-wrapper flex flex-col-reverse gap-2">
					<div>
						{#if typeof node.value === 'object'}
							{#each Object.keys(node.value) as key}
								<div class="flex items-center gap-1">
									<span class="font-bold">{key}:</span>
									<span>{node.value[key]}</span>
								</div>
							{/each}
						{:else if typeof node.value === 'string' || typeof node.value === 'number' || typeof node.value === 'boolean'}
							{console.log(node)}
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
								<div class="mx-3 flex w-full items-center justify-between gap-5">
									<div>{childId}</div>
									<div class="anchor-right -mx-3">
										<Anchor direction="east" output id={node.childrenIds[childId]} />
									</div>
								</div>
							{/each}
						{/if}
					</div>
				</div></Node
			>
		{/each}
	</Svelvet>
</div>

<style>
	.node-wrapper {
		padding: 1rem;
	}

	.anchor-left {
		position: absolute;
		top: 0;
		left: 0;
	}

	.anchor-right {
		float: right;
		top: 0;
	}
</style>
