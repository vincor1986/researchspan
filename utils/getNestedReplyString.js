const getNestedReplyString = (head, postId) => {
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
  const middle = indexes.map((index) => `.responses[${index}]`);
  return "head" + middle.join("") + ".responses.push(newPost);";
};

module.exports = getNestedReplyString;
