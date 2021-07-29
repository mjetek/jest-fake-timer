beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("setImmediate callback should be called before setTimeout callback", async () => {
  const promiseImmediate = new Promise((resolve) => setImmediate(resolve)).then(
    () => console.log("setImmediate callback")
  );
  const promiseTimeout = new Promise((resolve) =>
    setTimeout(() => setTimeout(resolve, 100), 100)
  ).then(() => console.log("setTimeout callback"));

  jest.advanceTimersByTime(200);

  await Promise.all([promiseTimeout, promiseImmediate]);
});
