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

exports.default = getArxivPapers;
