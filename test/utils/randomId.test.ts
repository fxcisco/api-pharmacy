import { randomId } from "@/utils";

describe('Utils test suite', () => {

  test('will ids be generated with correct lengths', () => {
    for (let i = 1; i < 36; i++) {
      expect(randomId(i)).toHaveLength(i);
    }
  })
})
