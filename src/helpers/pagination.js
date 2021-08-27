export const getPaginationData = query => {
  const { page = 1, pageSize = 10 } = query
  const offset = (page - 1) * pageSize

  return { offset, limit: Number(pageSize) }
}