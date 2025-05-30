import { useReadContract } from 'wagmi';

const RESULT_LABELS = {
  0: 'Ongoing',
  1: 'Yes',
  2: 'No', 
  3: 'Draw'
};

function VoteResult() {
  const { data: result, isError , refetch } = useReadContract({
    address: "0x648608aDeD2D65329Ebe14bDBce23A11c10189B4",
    abi: [
      {
        "type": "function",
        "name": "result",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "uint8",
            "internalType": "enum Vote.finalChoice"
          }
        ],
        "stateMutability": "view"
      }
    ],
    functionName: 'displayResult',
  });

  const getResult = async () => {
    try {
      const { data: result } = await refetch(); // Get the latest data
      console.log("result is:", result); // Log the raw value
    } catch (error) {
      console.error("Error fetching:", result);
    }
  };

  return (
    <div>
      <button 
        onClick={getResult} 
        className='p-3 m-3 font-semibold rounded-lg bg-purple-300'
      >
        Results: {result !== undefined ? RESULT_LABELS[result] : "Loading..."}
      </button>
    </div>
  );
}

export default VoteResult;