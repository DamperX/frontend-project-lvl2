import yaml from 'js-yaml';

const parseData = (content, ext) => {
  let parse;

  switch (ext) {
    case '.yml':
    case '.yaml':
      parse = yaml.load;
      break;
    case '.json':
      parse = JSON.parse;
      break;
    default:
      parse = JSON.parse;
      break;
  }

  return parse(content);
};

export default parseData;
