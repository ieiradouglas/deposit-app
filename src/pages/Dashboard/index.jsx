import NavBar from '../../components/NavBar'
import { Bars } from 'react-loader-spinner'
import { withAuthenticationRequired } from '@auth0/auth0-react'

function Dashboard() {
  return (
    <NavBar>
      <h1>Dashboard</h1>
    </NavBar>
  )
}

export default withAuthenticationRequired(Dashboard, {
  onRedirecting: () =>
    <div className="flex justify-center items-center h-screen w-full">
      <Bars
        height="80"
        width="80"
        color="rgb(99 102 241)"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>

})