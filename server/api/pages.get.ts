
export default defineEventHandler((event) => {
  const query = getQuery(event)
  const pagesList = [
    {
      name: 'home',
      link: '/'
    },
    {
      name: 'therapies',
      link: '/therapies'
    },
    {
      name: 'clinic',
      link: '/clinic'
    },
    {
      name: 'contacts',
      link: '/contacts'
    }
  ]
  return query.toFilter ? pagesList.filter(page => page.name !== query.toFilter) : pagesList
})
