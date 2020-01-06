export const filterSame = (...rest) => {
  const newArr = rest.reduce((prevArr, currentVal, currentIndex, arr) => {
    currentVal.forEach(item => {
      if (prevArr.indexOf(item) === -1) {
        arr.forEach((siblingArr, siblingIndex) => {
          if (
            siblingIndex !== currentIndex &&
            siblingArr.indexOf(item) !== -1 &&
            prevArr.indexOf(item) === -1
          ) {
            prevArr.push(item);
          }
        });
      }
    });
    return prevArr;
  }, []);
  return newArr;
};
