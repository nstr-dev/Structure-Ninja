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
			y: (index / 1.5) * 100
		};
	}
</script>

<div class="mt-5 h-[800px] w-full">
	<Svelvet TD controls theme="dark">
		{#each nodes as node, index (node.id)}
			<Node id={node.id} useDefaults position={getRandomPosition(index, node.depth)}>
				<div>
					{#if typeof node.value === 'object'}
						{#each Object.keys(node.value) as key}
							<div class="flex items-center">
								<span class="font-bold">{key}:</span>
								<span>{node.value[key]}</span>
							</div>
						{/each}
					{:else if typeof node.value === 'string' || typeof node.value === 'number' || typeof node.value === 'boolean'}
						{console.log(node)}
					{/if}

					{#if node.parentId}
						<Anchor input id={node.id} connections={[[node.parentId, node.parentId]]} />
					{/if}

					{#if node.childrenIds}
						{#each Object.keys(node.childrenIds) as childId}
							<div>{childId}</div>
							<Anchor output id={node.id} />
						{/each}
					{/if}
				</div>
			</Node>
		{/each}
	</Svelvet>
</div>
