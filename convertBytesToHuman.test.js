/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from './convertBytesToHuman';

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman("string")).toBe(false)
  expect(convertBytesToHuman("100")).toBe(false)
  expect(convertBytesToHuman(true)).toBe(false)
  expect(convertBytesToHuman(false)).toBe(false)
  expect(convertBytesToHuman(undefined)).toBe(false)
  expect(convertBytesToHuman(null)).toBe(false)
  // ...
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(0)).toBe("0 B")
  expect(convertBytesToHuman(0.5)).toBe("0.5 B")
  expect(convertBytesToHuman(500)).toBe("500 B")
  expect(convertBytesToHuman(100)).toBe("100 B")
  expect(convertBytesToHuman(1024)).toBe("1 KB")
  expect(convertBytesToHuman(10000)).toBe("9.77 KB")
  expect(convertBytesToHuman(10000.5)).toBe("9.77 KB")
  expect(convertBytesToHuman(50000)).toBe("48.83 KB")
  expect(convertBytesToHuman(10000000)).toBe("9.54 MB")
  expect(convertBytesToHuman(50000000)).toBe("47.68 MB")
  expect(convertBytesToHuman(10000000000)).toBe("9.31 GB")
  expect(convertBytesToHuman(70000000000)).toBe("65.19 GB")
  expect(convertBytesToHuman(10000000000000)).toBe("9.09 TB")
  expect(convertBytesToHuman(70000000000000)).toBe("63.66 TB")
  expect(convertBytesToHuman(7000000000000000)).toBe("6.22 PB")
  expect(convertBytesToHuman(50000000000000000)).toBe("44.41 PB")
  expect(convertBytesToHuman(11150000000000000000)).toBe("9.67 EB")
  expect(convertBytesToHuman(777150000000000000000)).toBe("674.07 EB")
  expect(convertBytesToHuman(12777150000000000000000)).toBe("10.82 ZB")
  expect(convertBytesToHuman(512777150000000000000000)).toBe("434.34 ZB")
  expect(convertBytesToHuman(1234567890000000000000000)).toBe("1.02 YB")
  expect(convertBytesToHuman(771234567890000000000000000)).toBe("637.95 YB")
  // ...
});

// другая группа проверок

test('Возвращает false для неправильного отрицательных чисел', () => {
  expect(convertBytesToHuman(-1)).toBe(false)
  expect(convertBytesToHuman(-100)).toBe(false)
  expect(convertBytesToHuman(-10000)).toBe(false)
  expect(convertBytesToHuman(-1000000)).toBe(false)
  expect(convertBytesToHuman(-1000000000)).toBe(false)
});
