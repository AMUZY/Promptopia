import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
    title : "Promptopia",
    description : 'Discover & Share AI Prompts'
}

const RootLayout = ({children}) => {
  return (
    <html lang='en' >
        <head>
            <meta charSet="utf-8" />
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <title> Promptopia - An open source prompt library </title>
        </head>
        <body>
            <Provider>
                <div className="main">
                    <div className='gradient'/>
                </div>
                <main className='app'>
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout