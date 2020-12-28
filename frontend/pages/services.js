import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/layout'

function ServicesPage() {
    return (
        <Layout>
        <Head>
            <title>Services LuisF3</title>
        </Head>
            <div>Welcome to Next.js!</div>
            <h1>Services</h1>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
        </Layout>
    )
}

export default ServicesPage;