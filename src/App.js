import { useEffect, useState } from "react";
import AddCandidate from "./components/AddCandidate";
import Voting from "./components/Voting";
import { useAccount, useContract, useSigner } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { abi, votingContractAddress } from "./constants";

function App() {
  const [screen, setScreen] = useState("home");
  const { address } = useAccount();
  const [candidates, setCandidates] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);

  const { data: signer } = useSigner();
  const contract = useContract({
    address: votingContractAddress,
    abi: abi,
    signerOrProvider: signer,
  });

  const addCandidate = async (name, party, imageURI) => {
    try {
      const tx = await contract.addCandidate(name, party, imageURI);
      await tx.wait();
      console.log(tx);
      console.log("Candidate Added");
    } catch (err) {
      console.log(err);
    }
  };

  const vote = async (candidateId) => {
    try {
      const tx = await contract.vote(candidateId);
      await tx.wait();
      console.log(tx);
      console.log("Voted");
    } catch (err) {
      console.log(err);
    }
  };

  const getCandidates = async () => {
    try {
      const count = await contract.candidateCount();
      console.log("Candidate Count ", count.toString());
      let candidatesArr = [];
      for (let i = 1; i <= count; i++) {
        const candidate = await contract.candidates(i);
        const candidateObj = {
          name: candidate[0],
          party: candidate[1],
          imageURI: candidate[2],
        }
        candidatesArr.push(candidateObj);
      }
      setCandidates(candidatesArr);
    } catch (err) {
      console.log(err);
    }
  };

  const getTotalVotes = async () => {
    try {
      const count = await contract.totalVotes()
      console.log("Total Votes ", count.toString())
      setTotalVotes(count.toString())
    } catch (err) {
      console.log(err)
    }
  }

  const RenderScreen = () => {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-96">
        {screen === "addCandidate" ? (
          <AddCandidate setScreen={setScreen} addCandidate={addCandidate} />
        ) : (
          <Voting setScreen={setScreen} vote={vote} candidates={candidates} />
        )}
      </div>
    );
  };

  useEffect(() => {
    if (contract) {
      getCandidates();
      getTotalVotes();
    }
  }, [contract]);
  console.log(candidates);

  return (
    <div className="h-screen overflow-hidden bg-black text-white">
      <div className="flex items-center justify-between flex-row p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Voting Dapp</h1>
        <ConnectButton />
      </div>
      {screen === "home" ? (
        <div className="flex flex-col gap-4 items-center justify-center h-96">
          {address ? (
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-4xl font-extrabold">Voting</h1>
              <div className="flex flex-row gap-4 items-center justify-center font-medium text-lg">
                <button
                  onClick={() => setScreen("addCandidate")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Add Candidate
                </button>
                <button
                  onClick={() => setScreen("vote")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Vote
                </button>
              </div>
            </div>
          ) : (
            <div className="text-lg">Wallet not connected</div>
          )}
        </div>
      ) : (
        <RenderScreen />
      )}
    </div>
  );
}

export default App;
