
export default (error: IRequestError) => {
  const dataError = error.data.error
  return createError({
    statusCode: dataError.status,
    statusMessage: dataError.message,
    fatal: true
  })
}
