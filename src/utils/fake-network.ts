// fake a cache so we don't slow down stuff we've already seen
let fakeCache: FakeCache = {};

interface FakeCache {
  [key: string]: "cached" | null;
}

const fakeNetwork = async (key?: string): Promise<void> => {
  // if no key is passed, reset cache
  if (!key) {
    fakeCache = {};
  } else {
    if (!fakeCache[key]) {
      return new Promise((res) => {
        setTimeout(res, 0);
      });
    }
    fakeCache[key] = "cached";
  }

  return new Promise((res) => {
    setTimeout(res, Math.random() * 1000);
  });
};

export default fakeNetwork;
