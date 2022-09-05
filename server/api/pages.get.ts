
export default defineEventHandler((event) => {
  const query = useQuery(event)
  const pagesList = [
    {
      name: 'home',
      link: '/'
    },
    {
      name: 'terapies',
      link: '/terapies'
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
