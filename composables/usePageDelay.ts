
import { LOADING } from '@/constants'

export default async () => {
  await new Promise(resolve => setTimeout(resolve, LOADING.PAGE_DELAY))
}
