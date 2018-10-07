export function expect(label, condition) {
  if (!!condition) {
    console.log(`Expect ${label}: %cPASS`, 'color: #00a500;');
  } else {
    console.error(`Expect ${label}: FAIL`);
  }
}

export default {
  expect,
}
