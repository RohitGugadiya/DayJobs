import NavBar from '../components/NavBar'

function HomePage() {
    return (
        <div>
            <NavBar />
            <main style={{ padding: '1rem' }}>
                <h1>Welcome to DayJobs</h1>
                <p className="muted">Find one-day work, fast.</p>
            </main>
        </div>
    )
}

export default HomePage