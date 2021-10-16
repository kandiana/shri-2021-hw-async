module.exports = function (Homework) {
  const TIMEOUT = 1000;
  const timers = [];

  const clearTimers = () => {
    timers.forEach((timer) => clearTimeout(timer));
  };

  const getPromise = (asyncArray, i) => {
    return new Promise((resolve, reject) => {
      asyncArray.get(i, resolve);

      const timer = setTimeout(() => {
        reject(new Error('Timeout'));
      }, TIMEOUT);

      timers.push(timer);
    });
  };

  const lengthPromise = (asyncArray) => {
    return new Promise((resolve, reject) => {
      asyncArray.length(resolve);

      const timer = setTimeout(() => {
        reject(new Error('Timeout'));
      }, TIMEOUT);

      timers.push(timer);
    });
  };

  const addPromise = (a, b) => {
    return new Promise((resolve, reject) => {
      Homework.add(a, b, resolve);

      const timer = setTimeout(() => {
        reject(new Error('Timeout'));
      }, TIMEOUT);

      timers.push(timer);
    });
  };

  const lessPromise = (a, b) => {
    return new Promise((resolve, reject) => {
      Homework.less(a, b, resolve);

      const timer = setTimeout(() => {
        reject(new Error('Timeout'));
      }, TIMEOUT);

      timers.push(timer);
    });
  };

  const reducerPromise = (acc, curr, i, src, reducer) => {
    return new Promise((resolve, reject) => {
      reducer(acc, curr, i, src, resolve);

      const timer = setTimeout(() => {
        reject(new Error('Timeout'));
      }, TIMEOUT);

      timers.push(timer);
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

    clearTimers();
  };
};
