import { describe, expect, it } from 'vitest';

import getData from './get-data-property';

describe('getDataProperty()', () => {
  it('given an object with a data key: should return the data', () => {
    const data = 'foo';
    const objectWithData = { data, other: 'bar' };

    const actual = getData(objectWithData);
    const expected = data;

    expect(actual).toEqual(expected);
  });
});
