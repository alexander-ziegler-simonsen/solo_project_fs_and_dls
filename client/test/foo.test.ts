import { assert, expect, test } from 'vitest'

test('test 1 - Math.sqrt()', () => {
    expect(Math.sqrt(4)).toBe(2)
    expect(Math.sqrt(144)).toBe(12)
    expect(Math.sqrt(2)).toBe(Math.SQRT2)
  })

test('test 2 - JSON', () => {
    const input = {
      foo: 'hello',
      bar: 'world',
    }
  
    const output = JSON.stringify(input)
  
    expect(output).eq('{"foo":"hello","bar":"world"}')
    assert.deepEqual(JSON.parse(output), input, 'matches original')
  })