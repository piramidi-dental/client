
import { Loading } from '@/types/enums'

export default async () => {
  await new Promise(resolve => setTimeout(resolve, Loading.AnimationDelay))
}
