export default function BusinessLayout({children, }: {children: React.ReactNode}) {
    return (
        <>
            <main>
                <h1>Business</h1>
                {children}
            </main>
        </>
    )
}