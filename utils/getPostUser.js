const getPostUser = (head, postId) => {
  const indexArray = head.replyData[0][postId][0];
  let idMiddle = indexArray.map((index) => `.responses[${index}]`);
  const postUserId = eval("head" + idMiddle.join("") + ".user.toString()");
  return postUserId;
};

module.exports = getPostUser;
