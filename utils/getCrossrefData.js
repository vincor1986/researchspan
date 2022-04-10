const axios = require("axios");

const getCrossrefData = async (query, cursor) => {
  if (cursor === "0" || cursor === 0) {
    cursor = "*";
  }

  const queryStr = query
    .split(" ")
    .map((el) => el.trim())
    .join("+");

  const params = {
    headers: {
      Accept: "application/json",
      "User-Agent": "http://researchspan.com; mailto:info@vincentcoraldean.com",
    },
  };

  const url = `https://api.crossref.org/works?query=${queryStr}&filter=has-abstract:1&select=DOI,URL,abstract,author,published,publisher,score,issue,page,title,type,volume&sort=relevance&cursor=${cursor}&mailto=info@vincentcoraldean.com`;

  const res = await axios.get(url, params);

  if (res.data.message.items.length === 0) {
    return [];
  }

  const results = res.data.message.items;

  return [
    res.data.message["total-results"],
    res.data.message["next-cursor"],
    results.map((item) => {
      return {
        DOI: item.DOI,
        format: item.format,
        publisher: item.publisher,
        abstract: item.abstract,
        date_published: item.published,
        title: item.title,
        authors: item.author,
        URL: item.URL,
        source: item.publisher,
      };
    }),
  ];
};

module.exports = getCrossrefData;

/*
Oxford Univeristy Press (OUP)
BMJ
American Medical Association (AMA)
IOS
*/
