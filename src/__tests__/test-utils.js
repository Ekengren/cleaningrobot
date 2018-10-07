export function expect(label, condition) {
  if (!!condition) {
    console.log(`Expect ${label}: PASS`);
  } else {
    console.error(`Expect ${label}: FAIL`);
  }
}

export default {
  expect,
}
