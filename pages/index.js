import Head from "next/head";

// components
import Layout, { siteTitle } from "../components/layout/layout";

// context
import UserState from "../context/Users/UserState";

let HomePage = () => {
    return (
        <UserState>
            <Layout>
                <Head>
                    <title>{siteTitle}</title>
                </Head>

            </Layout>
        </UserState>
    );
};

export default HomePage;
