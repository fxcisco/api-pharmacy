import { tryParseJSON } from "@/utils";

describe('Utils test suite', () => {

  test('parse valid json', () => {
    const json = '{ "key": 123 }'
    expect(tryParseJSON(json)).toEqual({ key: 123 });
  })

  test('parse invalid json', () => {
    const json = '{ key: 123 }'
    expect(tryParseJSON(json)).toEqual(false);
  })

  test('parse undefined value', () => {
    let json: any;
    expect(tryParseJSON(json)).toEqual(false);
  })
})
