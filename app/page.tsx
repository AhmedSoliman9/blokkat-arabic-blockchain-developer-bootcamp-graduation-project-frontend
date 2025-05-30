"use client";

import Link from "next/link";
import VoteResult from "@/components/VoteResult";
import OwnerControls from "@/components/OwnerControls";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import React, { useEffect } from "react";
import { readContract } from 'wagmi/actions';

export default function Home() {
  const { address, isConnected } = useAccount();

  useEffect(() => {
    console.log("all set!");
  }, [isConnected]);

  const wagmiContractConfig = {
    address: "0x648608aDeD2D65329Ebe14bDBce23A11c10189B4",
    abi: [
      {
        type: "constructor",
        inputs: [],
        stateMutability: "nonpayable"
      },
      {
        type: "function",
        name: "againstVote",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable"
      },
      {
        type: "function",
        name: "againsts",
        inputs: [],
        outputs: [
          {
            name: "",
            type: "uint256",
            internalType: "uint256"
          }
        ],
        stateMutability: "view"
      },
      {
        type: "function",
        name: "decision",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable"
      },
      {
        type: "function",
        name: "displayResult",
        inputs: [],
        outputs: [
          {
            name: "",
            type: "uint8",
            internalType: "enum Vote.finalChoice"
          }
        ],
        stateMutability: "view"
      },
      {
        type: "function",
        name: "getAgainsts",
        inputs: [],
        outputs: [
          {
            name: "",
            type: "uint256",
            internalType: "uint256"
          }
        ],
        stateMutability: "view"
      },
      {
        type: "function",
        name: "getWiths",
        inputs: [],
        outputs: [
          {
            name: "",
            type: "uint256",
            internalType: "uint256"
          }
        ],
        stateMutability: "view"
      },
      {
        type: "function",
        name: "payMembership",
        inputs: [],
        outputs: [],
        stateMutability: "payable"
      },
      {
        type: "function",
        name: "payedMembership",
        inputs: [
          {
            name: "",
            type: "address",
            internalType: "address"
          }
        ],
        outputs: [
          {
            name: "",
            type: "bool",
            internalType: "bool"
          }
        ],
        stateMutability: "view"
      },
      {
        type: "function",
        name: "resetVote",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable"
      },
      {
        type: "function",
        name: "result",
        inputs: [],
        outputs: [
          {
            name: "",
            type: "uint8",
            internalType: "enum Vote.finalChoice"
          }
        ],
        stateMutability: "view"
      },
      {
        type: "function",
        name: "voteRecord",
        inputs: [
          {
            name: "",
            type: "address",
            internalType: "address"
          }
        ],
        outputs: [
          {
            name: "",
            type: "uint8",
            internalType: "enum Vote.voteState"
          }
        ],
        stateMutability: "view"
      },
      {
        type: "function",
        name: "voters",
        inputs: [
          {
            name: "",
            type: "uint256",
            internalType: "uint256"
          }
        ],
        outputs: [
          {
            name: "",
            type: "address",
            internalType: "address"
          }
        ],
        stateMutability: "view"
      },
      {
        type: "function",
        name: "withVote",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable"
      },
      {
        type: "function",
        name: "withs",
        inputs: [],
        outputs: [
          {
            name: "",
            type: "uint256",
            internalType: "uint256"
          }
        ],
        stateMutability: "view"
      }
    ]
  };


  const { writeContract } = useWriteContract();

  const payMembership = async () => {
  try {
    await writeContract({
      ...wagmiContractConfig,
      functionName: "payMembership",
      value: BigInt(10000000000),
    });
  } catch (error) {
    console.error("Membership payment failed:", error);
  }
};

  const withVote = async () => {
    writeContract({
      ...wagmiContractConfig,
      functionName: "withVote"
    });
  };

  const againstVote = async () => {
    writeContract({
      ...wagmiContractConfig,
      functionName: "againstVote"
    });
  };


  return (
    <>
      <div className="p-4 m-4">
        <w3m-network-button />
        <w3m-button />
      </div>

      <div className="p-4 m-4 cursor-pointer font-semibold rounded-lg bg-red-200">
        {isConnected ? `Connected: ${address}` : `Not Connected`}
      </div>

      <button onClick={payMembership} className="p-4 m-4 cursor-pointer font-semibold rounded-lg bg-green-300">
      Pay Membership</button>

      <div>
        <button onClick={withVote} className="p-4 m-4 cursor-pointer font-semibold rounded-lg bg-yellow-300">
          with
        </button>
      </div>

      <div>
        <button onClick={againstVote} className="p-4 m-4 cursor-pointer font-semibold rounded-lg bg-yellow-300">
          against
        </button>
      </div>

      <div>
        <OwnerControls />
      </div>

      <div>
        <VoteResult />
      </div>

    </>
  );
}
