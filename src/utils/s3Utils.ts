export const s3Url = ():string => process.env.NODE_ENV === 'production'
    ? process.env.S3_PROD_URL.toString()
    : process.env.S3_DEV_URL.toString()