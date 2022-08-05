
import type { FetchOptions } from 'ohmyfetch'

export default (path: string, opts?: FetchOptions | { key: string }) => {
  const { apiBase: baseURL } = useRuntimeConfig()

  if (!baseURL) { throw new Error('baseURL is not defined') }

  return useFetch(path, { baseURL, ...(opts && { ...opts }) })
}
