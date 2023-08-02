/* eslint-disable no-console */
import { ChatGroupMember } from '@prisma/client';
import { Pool } from 'pg';

import { disconnectUser, sendToMany } from './socket';

// connection details inherited from environment
const pool = new Pool({
  max: 1,
  min: 0,
  idleTimeoutMillis: 120_000,
  connectionTimeoutMillis: 10_000,
  connectionString: process.env.DATABASE_URL,
});

const handleConnect = async ({
  connectionId,
  userId,
  groupId,
}: {
  connectionId: string;
  body: unknown;
  userId: string;
  groupId: string;
}) => {
  console.log('connecting');
  console.log('connectionId', connectionId);
  console.log('groupId', groupId);
  console.log('userId', userId);

  const client = await pool.connect();

  const TEXT =
    'SELECT * FROM "ChatGroupMember" WHERE ("ChatGroupMember"."groupId" = $1 AND "ChatGroupMember"."userId" = $2)';

  const VALUES = [groupId, userId];

  try {
    const { rows } = await client.query(TEXT, VALUES);
    console.log('connect', rows);
    const member = rows[0] as ChatGroupMember;
    await (member
      ? client.query(
          'UPDATE "ChatGroupMember" SET "connectionId" = $1 WHERE "id" = $2',
          [connectionId, member.id],
        )
      : disconnectUser(connectionId));
  } catch (error) {
    console.log(error);
  } finally {
    client.release(true);
  }

  console.log('connectionId', connectionId);
  console.log('groupId', groupId);
  console.log('userId', userId);
};

const handleDisconnect = async (connectionId: unknown) => {
  const client = await pool.connect();
  try {
    await client.query(
      'UPDATE "ChatGroupMember" SET "connectionId" = $1 WHERE "connectionId" = $2',
      // eslint-disable-next-line unicorn/no-null
      [null, connectionId],
    );
  } finally {
    client.release(true);
  }
  console.log('connectionId', connectionId);
};

const handleSendMessage = async ({
  connectionId,
  body,
  userId,
}: {
  connectionId: string;
  body: { message: string; groupId: string };
  userId: string;
}) => {
  console.log('connectionId', connectionId);
  console.log('body', body);
  // send message
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      'SELECT * from "ChatGroupMember" WHERE "ChatGroupMember"."groupId" = $1',
      [body.groupId],
    );
    console.log('sendMessage', rows);

    const connectionIds = rows
      ?.map(x => x.connectionId)
      .filter(v => v !== null)
      .filter(v => v !== connectionId)
      .filter(v => v !== '');

    await client.query(
      'INSERT INTO "ChatMessage" ("groupId", "userId", "message", "createdAt", "updatedAt") values($1, $2, $3, $4, $5)',
      [body.groupId, userId, body.message, new Date(), new Date()],
    );

    if (connectionIds.length > 0) {
      await sendToMany(connectionIds, { message: body.message });
    }
  } finally {
    client.release(true);
  }
};

export { handleConnect, handleDisconnect, handleSendMessage };
