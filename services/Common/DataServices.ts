
const instance = () => {
  const token =  JSON.parse(localStorage.getItem('admin-token'))
  const config = useRuntimeConfig()
  const fetchConfig = {
    baseURL: config.public.apiUrl,
    headers: {
      Accept: 'application/json',
    },
    onRequest: ({ options }: { options: any }): any => {

      if (process.server) {
        return
      }
      console.log(token)
      options.headers = {'Token': `${token}`}
      // if (token) {
      //   options.headers['Token'] = `${token}`
      // }
      console.log(options.headers)
    },
    onResponse: ({ response }: { response: { status: number } }): any => {
      // if (response.status === UNAUTHORIZED_CODE && process.client) {
      //   window.location.reload()
      // }
    },
    onResponseError: ({ response }: { response: any }): Promise<void> => {
      if (process.client && response.status === 201) {
        localStorage.removeItem('admin-token')
        window.location.reload()
      } 
      // eslint-disable-next-line no-throw-literal
      throw { ...response._data }
    },
  }
  console.log(fetchConfig)
  return {
    get: $fetch.create({ method: 'GET', ...fetchConfig }),
    put: $fetch.create({ method: 'PUT', ...fetchConfig }),
    post: $fetch.create({ method: 'POST', ...fetchConfig }),
    default: $fetch.create({ method: 'DELETE', ...fetchConfig }),
  }
}

export default instance
