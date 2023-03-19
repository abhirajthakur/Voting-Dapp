import { useState } from "react";

function AddCandidate({ setScreen, addCandidate }) {
    const [name, setName] = useState("");
    const [party, setParty] = useState("");
    const [imageURI, setImageURI] = useState("");

    const candidateAdd = async (e) => {
        e.preventDefault();
        console.log(name, party, imageURI);

        try {
            if (name === '' || party === '' || imageURI === '') {
                alert("Please fill all the fields");
                return;
            }
            await addCandidate(name, party, imageURI);
            setScreen("home");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
            <button className="absolute top-14 left-10 underline" onClick={() => setScreen('home')}>Back</button>
            <h1 className="text-4xl font-extrabold">Add Candidate</h1>
            <form onSubmit={(e) => candidateAdd(e)} className="flex flex-col gap-4 items-center justify-center">
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} className="bg-gray-800 text-white px-4 py-2 rounded-lg" />
                <input type="text" placeholder="Party" onChange={(e) => setParty(e.target.value)} className="bg-gray-800 text-white px-4 py-2 rounded-lg" />
                <input type="text" placeholder="Image url" onChange={(e) => setImageURI(e.target.value)} className="bg-gray-800 text-white px-4 py-2 rounded-lg" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium text-lg">Add Candidate</button>
            </form>
        </div>
    );
}

export default AddCandidate;