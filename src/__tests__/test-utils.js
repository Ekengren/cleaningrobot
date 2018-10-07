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

export default {
  expect,
}
