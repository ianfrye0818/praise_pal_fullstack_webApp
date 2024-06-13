const tokenQueue: Array<() => void> = [];
let refreshingToken = false;
export async function withTokenLock(fn: () => Promise<any>) {
  if (refreshingToken) {
    return new Promise((resolve) => {
      tokenQueue.push(() => resolve(fn()));
    });
  }

  refreshingToken = true;
  try {
    const result = await fn();
    return result;
  } finally {
    refreshingToken = false;
    while (tokenQueue.length > 0) {
      const nextResolve = tokenQueue.shift();
      if (nextResolve) {
        nextResolve();
      }
    }
  }
}
