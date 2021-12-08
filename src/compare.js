import _ from 'lodash';

const compareObjects = (firstObject, secondObject) => {
  const keysArray = _.union(_.keys(firstObject), _.keys(secondObject));

  const result = keysArray.map((key) => {
    if (!_.has(firstObject, key)) {
      return { key, value: secondObject[key], mod: '+' };
    }

    if (!_.has(secondObject, key)) {
      return { key, value: firstObject[key], mod: '-' };
    }

    if (firstObject[key] === secondObject[key]) {
      return { key, value: firstObject[key], mod: ' ' };
    }

    return { key, value: { before: firstObject[key], after: secondObject[key] }, mod: '+-' };
  });

  return _.sortBy(result, 'key');
};

export default compareObjects;
