import Link from 'next/link'

function ServicesPage() {
    return (
        <>
            <div>Welcome to Next.js!</div>
            <h1>Services</h1>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
        </>
    )
}

export default ServicesPage;