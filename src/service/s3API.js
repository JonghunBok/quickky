import AWS from 'aws-sdk'

export default {
  getS3Object () {
    const s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: 'quickky' }
    })

    return s3
  },

  async uploadFile ({ index, file }) {
    return new AWS.S3.ManagedUpload({
      params: {
        Bucket: 'quickky',
        Key: 'inventory/' + index + '/' + file.name,
        Body: file
        // ACL: 'public-read'
      }
    })
      .promise()
      .then(response => console.log('uploaded : ', response))
      .catch(err => console.log(err))
  },

  async getInventory (s3) {
    return s3.listObjects({ Prefix: 'inventory' })
      .promise()
      .then(data => data.Contents)
      .catch(err => console.log(err))
  },

  async getFileUrl (s3, key) {
    const params = {
      Bucket: 'quickky',
      Key: key
    }

    const promise = new Promise((resolve, reject) => {
      s3.getSignedUrl('getObject', params, (err, url) => {
        if (err) reject(err)
        else resolve(url)
      })
    })

    return promise
      .then(url => url)
      .catch(err => console.log('err: ', err))
  }
}
