module.exports = function (Homework) {
  const TIMEOUT = 1000;

  const getPromise = (asyncArray, i) => {
    return new Promise((resolve, reject) => {
      asyncArray.get(i, resolve);

      setTimeout(() => {
        reject(new Error('Timeout'));
      }, TIMEOUT);
    });
  };

  const lengthPromise = (asyncArray) => {
    return new Promise((resolve, reject) => {
      asyncArray.length(resolve);

      setTimeout(() => {
        reject(new Error('Timeout'));
      }, TIMEOUT);
    });
  };

  const addPromise = (a, b) => {
    return new Promise((resolve, reject) => {
      Homework.add(a, b, resolve);

      setTimeout(() => {
        reject(new Error('Timeout'));
      }, TIMEOUT);
    });
  };

  const lessPromise = (a, b) => {
    return new Promise((resolve, reject) => {
      Homework.less(a, b, resolve);

      setTimeout(() => {
        reject(new Error('Timeout'));
      }, TIMEOUT);
    });
  };

  const reducerPromise = (acc, curr, i, src, reducer) => {
    return new Promise((resolve, reject) => {
      reducer(acc, curr, i, src, resolve);

      setTimeout(() => {
        reject(new Error('Timeout'));
      }, TIMEOUT);
    });
  };

  return async (array, fn, initialValue, cb) => {
    try {
      const length = await lengthPromise(array);
      let result = initialValue;
      let i = 0;

      while (await lessPromise(i, length)) {
        [result, i] = await Promise.all([
          reducerPromise(result, await getPromise(array, i), i, array, fn),
          addPromise(i, 1)
        ]);
      }

      cb(result);
    } catch (e) {
      console.log(e);
    }
  };
};
