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

  return papers.map((item) => {
    return {
      DOI: item.id.replace("http://arxiv.org/abs/", ""),
      title: item.title,
      abstract: item.summary,
      authors: item.authors,
      date_published: item.published,
      URL: item.id,
    };
  });
};

module.exports = getArxivPapers;
