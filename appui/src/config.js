import Web3 from "web3";
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

let account0 = "0x5986f327CC0377Bb6488c8517Af5C6c8E2cAA464";
let myBlockABI = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "postIdList",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "string", name: "description", type: "string" },
      { internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "pushPost",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
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
    name: "getDescription",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "postID", type: "uint256" }],
    name: "getLikes",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "postID", type: "uint256" }],
    name: "getDislikes",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
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
    constant: false,
    inputs: [{ internalType: "string", name: "search", type: "string" }],
    name: "searchPost",
    outputs: [{ internalType: "bytes32[]", name: "", type: "bytes32[]" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];
let myBlockAddress = "0x6156314dD11687AD730fB3e9323862a89f7322B6"; // Initialize the rating contract with web3
// Reference: https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html
const myBlockContract = new web3.eth.Contract(myBlockABI, myBlockAddress);
export { myBlockContract, account0 };
