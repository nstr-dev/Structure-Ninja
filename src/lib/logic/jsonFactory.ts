export function parseAndValidateJson(json: string): object {
	const parsedJson = JSON.parse(json);
	return parsedJson;
}

export function parseAndValidateJsonReturnError(json: string): object {
	try {
		const parsedJson = JSON.parse(json);
		return parsedJson;
	} catch (error) {
		if (json.trim() === '') {
			return {};
		}
		return { error };
	}
}

type NestedObject = Record<string, unknown>;

export function breakdownObject(obj: NestedObject, path: string[] = []): string[] {
	let result: string[] = [];
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const newPath = [...path, key];
			if (typeof obj[key] === 'object' && obj[key] !== null) {
				// Aggregate results from recursion
				result = result.concat(breakdownObject(obj[key] as NestedObject, newPath));
			} else {
				// Add the path and value to the result
				result.push(`${newPath.join('.')} : ${obj[key]}`);
			}
		}
	}
	return result;
}

export function arrayToObject(arr: unknown[]) {
	return {
		json: arr
	};
}
