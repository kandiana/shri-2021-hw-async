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
      let currentValue;

      for (let i = 0; await lessPromise(i, length); i = await addPromise(i, 1)) {
        currentValue = await getPromise(array, i);
        result = await reducerPromise(result, currentValue, i, array, fn);
      }

      cb(result);
    } catch (e) {
      console.log(e);
    }
  };
};
