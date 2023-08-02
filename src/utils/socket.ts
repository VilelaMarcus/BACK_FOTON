/* eslint-disable no-console */
import { ApiGatewayManagementApi } from 'aws-sdk';

const ENDPOINT = process.env.WEBSOCKET_URL;

const client = new ApiGatewayManagementApi({ endpoint: ENDPOINT });

const sendToOne = async (id: string, body: unknown) => {
  console.log({ id, body });
  try {
    return client
      .postToConnection({
        ConnectionId: id,
        Data: Buffer.from(JSON.stringify(body)),
      })
      .promise();
  } catch (error) {
    console.log(error);
  }
};

const sendToMany = async (ids: string[], body: unknown) => {
  try {
    console.log('recipients', ids);
    const all = ids.map(id => sendToOne(id, body));
    return Promise.all(all);
  } catch (error) {
    console.log('error', error);
  }
};

const disconnectUser = async (id: string) => {
  try {
    return client
      .deleteConnection({
        ConnectionId: id,
      })
      .promise();
  } catch (error) {
    console.log('error', error);
  }
};

export { disconnectUser, sendToMany, sendToOne };
