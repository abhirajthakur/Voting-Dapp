function Voting({ setScreen, vote, candidates }) {
    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
            <button className="text-lg absolute top-14 left-10 underline" onClick={() => setScreen('home')}>Back</button>
            <h1 className="text-4xl font-extrabold">Voting</h1>
            <div className="flex gap-5 items-center justify-center">
                {candidates.map((candidate, i) => {
                    return (
                        <div key={i} className="flex flex-col gap-4 items-center justify-center">
                            <img src={candidate.imageURI} alt={candidate.name} className="w-36 h-36 rounded-full border-2 border-red-900" />
                            <h1 className="text-2xl font-bold">{candidate.name}</h1>
                            <button onClick={() => vote(i + 1)} className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium text-xl">Vote</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Voting;