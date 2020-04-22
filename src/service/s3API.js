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

    console.log('getFileUrl s3:', s3)

    const promise = new Promise((resolve, reject) => {
      s3.getSignedUrl('getObject', params, (err, url) => {
        if (err) reject(err)
        else resolve(url)
      })
    })

    return promise
      .then(url => url)
      .catch(err => console.log('err: ', err))
  },

  async getMemo (s3) {
    const params = {
      Bucket: 'quickky',
      Key: 'memo'
    }
    console.log('s3:', s3)

    const promise = new Promise((resolve, reject) => {
      s3.getObject(params, (err, obj) => {
        if (err) reject(err)
        else resolve(obj)
      })
    })

    return promise
      .then(obj => obj)
      .catch(err => console.log('memo err: ', err))
  },

  async putMemo (s3, memo) {
    const params = {
      Body: memo,
      Bucket: 'quickky',
      Key: 'memo'
    }

    const promise = new Promise((resolve, reject) => {
      s3.putObject(params, (err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
    })

    return promise
      .then(res => res)
      .catch(err => console.log('put memo err: ', err))
  }
}
