const Post = require("../models/Post");

const getNestedReplyString = (head, postId, del = false) => {
  let indexes = [],
    postFound = false;
  const recursivelyFindPost = (current) => {
    if (!current.responses || postFound) return;

    for (let i = 0; i < current.responses.length; i++) {
      if (current.responses[i]._id.toString() === postId) {
        postFound = true;
      } else {
        recursivelyFindPost(current.responses[i]);
      }
      if (postFound) {
        indexes.unshift(i);
        return;
      }
    }
    return false;
  };

  for (let i = 0; i < head.responses.length; i++) {
    recursivelyFindPost(head);
  }

  if (!postFound) return false;
  let middle = indexes.map((index) => `.responses[${index}]`);
  const idCommand = "head" + middle.join("") + ".user.toString()";
  const delId = eval(idCommand);

  del && middle.pop();

  return del
    ? [
        delId,
        "head" +
          middle.join("") +
          `.responses.splice(${indexes[indexes.length - 1]}, 1);`,
      ]
    : "head" + middle.join("") + ".responses.push(newPost);";
};

module.exports = getNestedReplyString;
