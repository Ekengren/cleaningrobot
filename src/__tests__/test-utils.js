export function expect(label, condition) {
  try {
    if (!!condition) {
      console.log(`Expect ${label}: %cPASS`, 'color: #00a500;');
    } else {
      console.log(`Expect ${label}: %cFAIL`, 'color: #f00000;');
    }
  } catch (e) {
    console.log(`Expect ${label}: %cFAIL`, 'color: #f00000;');
  }
}

/**
 * Returns true if vector 1 is equal to vector 2.
 * @param v1
 * @param v2
 * @returns {boolean}
 */
export function vEq(v1, v2) {
  return v1.x1 === v2.x1 && v1.y1 === v2.y1 && v1.x2 === v2.x2 && v1.y2 === v2.y2;
}

export default {
  expect,
  vEq,
}
