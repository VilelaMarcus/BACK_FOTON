/* eslint-disable no-console */
import AWS from 'aws-sdk';

AWS.config = new AWS.Config({
  region: 'us-east-1',
});

const s3 = new AWS.S3();

export const uploadToS3 = async (options: {
  bucket: string;
  acl?: string;
  key: string;
  data: Buffer;
  contentType: string;
}) => {
  console.log(`bucket name: ${options.bucket}`);
  console.log(`key: ${options.key}`);
  console.log(`content type: ${options.contentType}`);

  try {
    await s3
      .putObject({
        Bucket: options.bucket,
        ACL: options.acl || 'public-read',
        Key: options.key,
        Body: options.data,
        ContentType: options.contentType,
      })
      .promise();
  } catch (error) {
    console.log(error);
    throw error;
  }

  return {
    url: `https://${options.bucket}.s3.amazonaws.com/${options.key}`,
    name: options.key,
    type: options.contentType || 'application/',
  };
};

export const getDataAndContentType = (data: string) => ({
  data: Buffer.from(data.replace(/^data:image\/\w+;base64,/, ''), 'base64'),
  contentType: data.split(';')[0].split('/')[1],
});

export const deleteFromS3 = async ({
  bucket,
  key,
}: {
  bucket: string;
  key: string;
}) => {
  await s3.deleteObject({ Bucket: bucket, Key: key }).promise();
};
