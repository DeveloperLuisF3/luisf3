import Link from 'next/link'

function HomePage() {
    return (
        <>
            <div>Welcome to Next.js!</div>
            <h1>index</h1>
            <h2 className="title">
            Read{' '}
            <Link href="/services">
                <a>this page!</a>
            </Link>
            </h2>
        </>
        
    )
}

export default HomePage;