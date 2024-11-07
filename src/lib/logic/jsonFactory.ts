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
