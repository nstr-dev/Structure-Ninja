export function parseAndValidateJson(json: string): object {
	const parsedJson = JSON.parse(json);
	return parsedJson;
}
