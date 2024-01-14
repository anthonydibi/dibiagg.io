import Nav from '../components/Nav/Nav'
import ContactFooter from '../components/ContactFooter'
import Banner from '../components/Banner'
import { FaGithub } from 'react-icons/fa'
import { PropsWithChildren } from 'react'

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Banner
        header={'DIBIAGG.IO is open source!'}
        action={'Check it out on Github.'}
        buttonText={'Go'}
        buttonIcon={<FaGithub />}
        onClick={() => {
          window.open('https://github.com/anthonydibi/dibiagg.io')
        }}
      />
      <Nav />
      <main>{children}</main>
      <ContactFooter />
    </>
  )
}
