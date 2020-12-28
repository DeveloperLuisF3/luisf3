import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout/layout'
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

function HomePage() {
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div>Welcome to Next.js!</div>
            <h1>index</h1>
            <h2 className="title">
            Read{" "}
                <Link href="/services">
                    <a>this page!</a>
                </Link>
            </h2>
            <Container>
                <Box my={2}>
                    {[...new Array(12)]
                    .map(
                        () => `Cras mattis consectetur purus sit amet fermentum.
                        Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                        Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
                    )
                    .join("\n")}
                </Box>
            </Container>
        </Layout>
    );
}

export default HomePage;