const slug = require('../../../src/utils/slug');

it('generate slug', () => {
  expect(slug('Nguyễn Phước Tùng')).toBe('nguyen-phuoc-tung');
});
