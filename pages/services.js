import Head from 'next/head';
import Link from 'next/link';

// components
import Layout from '../components/layout/layout';

// context 
import UserState from "../context/Users/UserState";

let ServicesPage = () => {
    return (
        <UserState>
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
        </UserState>
    );
};

export default ServicesPage;
