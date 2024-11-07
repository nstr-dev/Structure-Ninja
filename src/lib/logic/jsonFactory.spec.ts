import { parseAndValidateJson, parseAndValidateJsonReturnError } from '$lib/logic/jsonFactory';
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

	it('parseAndValidateJsonReturnError - Regular', () => {
		expect(parseAndValidateJsonReturnError('{ "person": { "name": "Jane", "age": 28 } }')).toEqual({
			person: { name: 'Jane', age: 28 }
		});
	});

	it('parseAndValidateJsonReturnError - Empty JSON', () => {
		expect(parseAndValidateJsonReturnError('')).toEqual({});
	});

	it('parseAndValidateJsonReturnError - Invalid JSON', () => {
		const result: { error?: SyntaxError } = parseAndValidateJsonReturnError(
			'{ "per: "Jane", "age": 28 } }'
		);
		expect(result).toHaveProperty('error');
		expect(result.error).toBeInstanceOf(SyntaxError);
		expect(result.error?.message).toMatch(/Expected ':' (after property name|before value in object property definition)/);
	});
});
