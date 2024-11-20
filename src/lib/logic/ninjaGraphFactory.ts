import { v4 as uuidv4 } from 'uuid';

type Primitive = string | number | boolean | null;

type NinjaNode = {
	id: string;
	type: 'object' | 'array';
	value?: Primitive | Record<string, Primitive>;
	childrenIds?: Record<string, string>;
	parentId?: string;
	depth?: number;
};

interface NinjaGraph {
	nodes: NinjaNode[];
}

function isPrimitive(value: unknown): value is Primitive {
	return value === null || ['string', 'number', 'boolean'].includes(typeof value);
}

function isObjectWithPrimitivesOnly(value: unknown): value is Record<string, Primitive> {
	return (
		value !== null &&
		typeof value === 'object' &&
		!Array.isArray(value) &&
		Object.values(value).every(isPrimitive)
	);
}

export function createNinjaGraphFromJSON(obj: object): NinjaGraph {
	const nodes: NinjaNode[] = [];

	function process(value: unknown, parentId?: string, currentDepth?: number): string {
		const id = uuidv4();
		const depth = currentDepth !== undefined ? currentDepth + 1 : 0;
		if (isPrimitive(value)) {
			nodes.push({
				id,
				type: 'object',
				value: value,
				parentId,
				depth
			});
		} else if (isObjectWithPrimitivesOnly(value)) {
			nodes.push({
				id,
				type: 'object',
				value: value as Record<string, Primitive>,
				parentId,
				depth
			});
		} else if (Array.isArray(value)) {
			const node: NinjaNode = {
				id,
				type: 'array',
				childrenIds: {},
				parentId,
				depth
			};

			value.forEach((item, index) => {
				const childId = process(item, id, depth);
				node.childrenIds![index.toString()] = childId;
			});

			nodes.push(node);
		} else if (value && typeof value === 'object') {
			const node: NinjaNode = {
				id,
				type: 'object',
				childrenIds: {},
				parentId,
				depth
			};

			Object.entries(value as Record<string, unknown>).forEach(([key, childValue]) => {
				if (isPrimitive(childValue)) {
					if (!node.value) node.value = {};
					(node.value as Record<string, Primitive>)[key] = childValue;
				} else {
					const childId = process(childValue, id, depth);
					node.childrenIds![key] = childId;
				}
			});

			nodes.push(node);
		} else {
			throw new Error(`Unsupported value type: ${value}`);
		}

		return id;
	}

	process(obj);

	return { nodes };
}
