const getReplyCommand = (indexArray) => {
  let commandString = "";
  let middle = indexArray.map((index) => `[${index}].responses`);
  return "head.responses" + middle.join("") + ".push(newPost);";
};

module.exports = getReplyCommand;
