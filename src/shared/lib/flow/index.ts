import { getNodeById } from './lib'
import { flowManager as manager } from './model'

export { flowManager } from './model'
export const flowApi = {
  manager,
  getNodeById,
}
