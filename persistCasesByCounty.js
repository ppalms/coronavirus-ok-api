import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, _context, _callback) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.casesByCountyTableName,
    Item: {
      county: data.county,
      cases: data.cases,
      deaths: data.deaths,
      retrievedDate: data.retrievedDate
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
