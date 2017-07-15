const imageUpload = function(source, token) {
  return new Promise((resolve, reject) => {
    const url = 'http://meensinapp.com/user-app/api/user/image/upload'
    const image = {
      uri: source.uri,
      type: 'image/jpeg',
      name: 'myImage' + '-' + Date.now() + '.jpg'
    };
    const imgBody = new FormData();
    imgBody.append('avatar', image);
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: imgBody
    }).then((res) => {
      resolve(res._bodyText);
    }).catch((err) => {
      reject(err)
    });
  });
}

export default imageUpload;
