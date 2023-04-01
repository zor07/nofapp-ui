const nodeEnv : string = process.env.NODE_ENV
const s3ProdUrl : string = process.env.REACT_APP_S3_PROD_URL
const s3DevUrl : string = process.env.REACT_APP_S3_DEV_URL

export const s3Url = ():string => {
    return nodeEnv === 'production'
        ? s3ProdUrl
        : s3DevUrl
}