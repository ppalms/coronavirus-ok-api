import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
import moment from 'moment';

export async function main(_event, _context) {
  const params = {
    TableName: process.env.statewideTableName
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
    return success(result.Items);
  } catch (e) {
    return failure({ status: false, error: e });
  }
}

export async function byDate(event, _context) {
  const params = {
    TableName: process.env.statewideTableName,
    FilterExpression: "retrievedDate BETWEEN :startDate AND :endDate",
    ExpressionAttributeValues: {
      ":startDate": moment(event.pathParameters.date).startOf('day').format(),
      ":endDate": moment(event.pathParameters.date).endOf('day').format()
    }
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
    return success(result.Items);
  } catch (e) {
    return failure({ status: false, error: e });
  }
}
