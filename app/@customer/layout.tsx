export default function CustomerLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="min-h-screen">
            <main>
                {children}
                <footer className="p-6">Footer</footer>
            </main>
        </div>
    )
}
