import { getWithDivider } from './utils';

describe('getWithDivider tests', () => {
  it('should include both args in the result', () => {
    const first = 'foo';
    const second = 'bar';
    const result = getWithDivider(first, second);

    expect(result).toMatch(first);
    expect(result).toMatch(second);
  });
});
