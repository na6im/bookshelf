function client(endpoint, customConfig = {}) {
  const config = {
    method: 'GET',
    ...customConfig,
  }

  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    .then(async r => {
      const data = await r.json()
      if (r.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

export {client}
