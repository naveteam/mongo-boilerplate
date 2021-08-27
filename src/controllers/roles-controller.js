import Role from 'models/Role'
import { getPaginationData } from 'helpers'

export const index = ctx => {
  const { limit, offset } = getPaginationData(ctx.query)
  const customLabels = { docs: 'roles' }
  return Role.paginate({},
    { offset, limit, customLabels}
  )
}

export default {
  index
}
