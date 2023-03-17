export default function ({ next, router }) {
    if (!localStorage.getItem('access_token')) {
      return router.push('/signin')
    }
  
    return next()
  }
  