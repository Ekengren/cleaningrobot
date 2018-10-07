export function expect(label, condition) {
  if (!!condition) {
    console.log(`Expect ${label}: %cPASS`, 'color: #00a500;');
  } else {
    console.log(`Expect ${label}: %cFAIL`, 'color: #f00000;');
  }
}

export default {
  expect,
}
