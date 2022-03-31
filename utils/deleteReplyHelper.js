const deleteReplyHelper = (head, indexArray) => {
  const targetIndex = indexArray[indexArray.length - 1];

  let idMiddle = indexArray.map((index) => `.responses[${index}]`);
  const delMiddle = idMiddle.filter((_, i, arr) => i !== arr.length - 1);

  const userId = eval("head" + idMiddle.join("") + ".user.toString()");

  const commandString =
    "head" + delMiddle.join("") + `.responses.splice(${targetIndex}, 1);`;

  return [userId, commandString];
};

module.exports = deleteReplyHelper;
