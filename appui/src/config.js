import Web3 from "web3";
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

let account0 = "0xF3a850A891e81F670Fe694ef6ca4f0384dE17dfd";
let myBlockABI = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    constant: true,
    inputs: [],
    name: "n_posts",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "string", name: "_ipfsHash", type: "string" },
      { internalType: "string", name: "_description", type: "string" },
      { internalType: "uint256", name: "_fee", type: "uint256" },
    ],
    name: "pushPost",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "uint256", name: "postID", type: "uint256" }],
    name: "viewPost",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "uint256", name: "postID", type: "uint256" },
      { internalType: "bool", name: "like", type: "bool" },
    ],
    name: "ratePost",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "postID", type: "uint256" }],
    name: "getPostDetails",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "description", type: "string" },
          { internalType: "uint256", name: "fee", type: "uint256" },
          { internalType: "uint256", name: "likes", type: "uint256" },
          { internalType: "uint256", name: "dislikes", type: "uint256" },
        ],
        internalType: "struct MyBlock.PostDetails",
        name: "",
        type: "tuple",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "string", name: "_search", type: "string" },
      { internalType: "uint256", name: "start", type: "uint256" },
    ],
    name: "searchPost",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
let myBlockAddress = "0x5c84dF96876560589f4C5f1CC384866D269C1456"; // Initialize the rating contract with web3
// Reference: https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html
const myBlockContract = new web3.eth.Contract(myBlockABI, myBlockAddress);
export { myBlockContract, account0 };
