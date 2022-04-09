const axios = require("axios");

const getCrossrefData = async (query) => {
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

  const url = `https://api.crossref.org/works?query=${queryStr}&select=DOI,URL,abstract,author,published,publisher,score,issue,page,title,type,volume&mailto=info@vincentcoraldean.com`;

  const res = await axios.get(url, params);

  if (res.data.message.items.length === 0) {
    return [];
  }

  const results = res.data.message.items;

  return results.map((item) => {
    return {
      DOI: item.DOI,
      format: item.format,
      publisher: item.publisher,
      abstract: item.abstract,
      date_published: item.published,
      title: item.title,
      authors: item.author,
      URL: item.URL,
    };
  });
};

module.exports = getCrossrefData;

/*
Oxford Univeristy Press (OUP)
BMJ
American Medical Association (AMA)
IOS
*/
