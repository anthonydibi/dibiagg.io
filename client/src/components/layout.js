import Nav from './Nav.js'
import ContactFooter from './ContactFooter.js'
import Banner from './Banner.js'
import { FaGithub } from 'react-icons/fa'

export default function Layout({ children }) {
    return (
      <>
        <Banner header={"DIBIAGG.IO is open source!"} action={"Check it out on Github."} buttonText={"Go"} buttonIcon={<FaGithub />} onClick={() => {window.open("https://github.com/anthonydibi/dibiagg.io")}}/>
        <Nav /> 
        <main>{children}</main>
        <ContactFooter/>
      </>
    )
}