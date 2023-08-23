import { describe, expect, it } from 'vitest';

import { getCompanyType } from './authentication-helpers';

describe('authentication helpers', () => {
  it('given a value (corporate): should return the correct company type', () => {
    const actual = getCompanyType('corporate');
    const expected = 'CORPORATE';

    expect(actual).toBe(expected);
  });

  it('given a value (startup): should return the correct company type', () => {
    const actual = getCompanyType('startup');
    const expected = 'STARTUP';

    expect(actual).toBe(expected);
  });

  it('given a value (incubator): should return the correct company type', () => {
    const actual = getCompanyType('incubator');
    const expected = 'INCUBATOR';

    expect(actual).toBe(expected);
  });

  it('given nothing: should return startup', () => {
    const actual = getCompanyType('startup');
    const expected = 'STARTUP';

    expect(actual).toBe(expected);
  });
});
