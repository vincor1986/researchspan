const arxiv = require("arxiv-api");

const getArxivPapers = async (search, start, max) => {
  const searchArray = search.split(" ");
  const queryParams = searchArray.map((str) => {
    return {
      name: `${str}`,
    };
  });

  const papers = await arxiv.search({
    searchQueryParams: [
      {
        include: queryParams,
      },
    ],
    start,
    maxResults: max,
  });

  return papers;
};

(async () => {
  const papers = await getArxivPapers("psychology cognitive");
  const first = papers[0];
  console.log(first.id.replace("http://arxiv.org/abs/", ""));
})();

exports.default = getArxivPapers;
