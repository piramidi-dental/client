
export default (error: IRequestError) => {
  const dataError = error.error
  return createError({
    statusCode: dataError.status,
    statusMessage: dataError.message,
    fatal: true
  })
}
