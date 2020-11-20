import Web3 from "web3";
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

let account0 = "0x0Af0c1BF2e66d7b89389F6D9091662c25B1Cb32C";
// let account0 = "0x926B19AC8a90852c7C371E76885aFacb00631DD1";
// let account0 = "0x5a09C2E56FB9751480671B5Bde7f7A0B908Ab805";
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
      { internalType: "string", name: "_title", type: "string" },
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
    name: "buyPost",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "postID", type: "uint256" }],
    name: "viewPost",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
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
          { internalType: "string", name: "title", type: "string" },
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
      { internalType: "string", name: "search", type: "string" },
      { internalType: "uint256", name: "start", type: "uint256" },
    ],
    name: "searchPost",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "string", name: "_sub", type: "string" },
      { internalType: "string", name: "_seq", type: "string" },
    ],
    name: "isSub",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
];
let myBlockAddress = "0x15e53d66136Ce76341727Ed10Da1588635f503Fd"; // Initialize the rating contract with web3
// Reference: https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html
const myBlockContract = new web3.eth.Contract(myBlockABI, myBlockAddress);
export { myBlockContract, account0 };
