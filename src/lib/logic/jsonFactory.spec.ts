import { parseAndValidateJson } from '$lib/logic/jsonFactory';
import { describe, expect, it } from 'vitest';

describe('jsonFactory', () => {
	it('parseAndValidateJson - Regular', () => {
		expect(parseAndValidateJson('{ "person": { "name": "Jane", "age": 28 } }')).toEqual({
			person: { name: 'Jane', age: 28 }
		});
	});

	it('parseAndValidateJson - Invalid JSON', () => {
		expect(() => parseAndValidateJson('{ "per: "Jane", "age": 28 } }')).toThrowError(SyntaxError);
	});
});
