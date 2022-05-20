import url from "url";
import { dummyListData } from "./dummyListData";

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

export const parseRequest = (req, res) => {
  const queryStringParameters = url.parse(req.url, true).query;

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
