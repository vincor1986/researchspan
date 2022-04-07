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

  const url = `https://api.crossref.org/works?query=${queryStr}&query.publisher-name=IOS&select=DOI,URL,abstract,author,published,publisher,score,issue,page,title,type,volume&mailto=info@vincentcoraldean.com`;

  const res = await axios.get(url, params);

  if (res.data.message.items.length === 0) {
    return console.log("no entries found");
  }

  // const result = res.data.message.items.sort((a, b) => b.score - a.score)[0];

  console.log(res.data.message.items);
  console.log(res.data.message.items[0].published["date-parts"]);

  // console.log("result", result);
  // console.log("result.resource.primary", result.resource.primary);
  // result.link && console.log("link", result.link[0]);
  // console.log("source", result.source);
  // console.log("url", result.URL);
};

(async () => await getCrossrefData("throat swelling swallowing"))();

/*

Oxford Univeristy Press (OUP)
BMJ
American Medical Association (AMA)
IOS
*/
