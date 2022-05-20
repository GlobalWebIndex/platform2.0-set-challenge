const express = require("express");
const url = require("url");

const PORT = 3001;

const app = express();

const dummyListData = [
  {
    name: "Chart 1",
    created_at: 1631530148312,
    modified_at: 1631530148312,
  },
  {
    name: "Chart 2",
    created_at: 1617010419094,
    modified_at: 1627284724744,
  },
  {
    name: "Test 3",
    created_at: 1626174889659,
    modified_at: 1626180305757,
  },
  {
    name: "My awesome test 4",
    created_at: 1622454043335,
    modified_at: 1622454043335,
  },
  {
    name: "Chart 5",
    created_at: 1622453396409,
    modified_at: 1622453396409,
  },
];

const is500 = (queryStringParameters) =>
  queryStringParameters &&
  queryStringParameters.orderBy &&
  queryStringParameters.orderBy === "dateCreated" &&
  queryStringParameters.order === "desc";

const is400 = (queryStringParameters) =>
  queryStringParameters &&
  queryStringParameters.orderBy &&
  queryStringParameters.orderBy !== "name" &&
  queryStringParameters.orderBy !== "dateCreated" &&
  queryStringParameters.orderBy !== "dateModified";

const parseRequest = (req, res) => {
  const queryStringParameters = url.parse(req.url, true).query;
  console.log(queryStringParameters);

  if (is500(queryStringParameters)) {
    res.status(500).send({
      error:
        "Currently no order by dateCreated descending has been implemented",
    });
  } else if (is400(queryStringParameters)) {
    res.status(400).send({ error: "Please check your request parameters" });
  } else {
    const orderBy = queryStringParameters.orderBy ?? "name";
    const order = queryStringParameters.order ?? "asc";
    const isAscending = order === "asc";
    let list;
    if (orderBy === "name") {
      if (isAscending)
        list = dummyListData.sort((a, b) => a.name.localeCompare(b.name));
      else list = dummyListData.sort((a, b) => b.name.localeCompare(a.name));
    } else if (orderBy === "dateCreated") {
      if (isAscending)
        list = dummyListData.sort((a, b) => a.created_at - b.created_at);
      else list = dummyListData.sort((a, b) => b.created_at - a.created_at);
    } else if (orderBy === "dateModified") {
      if (isAscending)
        list = dummyListData.sort((a, b) => a.modified_at - b.modified_at);
      else list = dummyListData.sort((a, b) => b.modified_at - a.modified_at);
    }
    return res.json({ charts: list });
  }
};

app.get("/api/charts", (req, res) => {
  parseRequest(req, res);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
