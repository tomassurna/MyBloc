# BlockChain-FinalProject

COMP-3800 (Blockchain) Final Project.

# MyBloc

## Introduction

MyBloc is an image sharing market platform where users are profit from their posts. The initial project was a social media app that resembled classic moguls, however the implementation as a Dapp allowed changes to the traditional formula. MyBloc takes advantage of transactional capabilities of Ethereum and treats images as commerce and profit from them. Users select images to post that can be accessed by others for a minimum fee. The image itself is stored on IPFS with its reference hash stored on the blockchain. Using the hash, the image can be rendered easily to view. When a user purchases a post, it can be viewed alongside their original posts via the profile page, which is associated with the given address. Earnings from MyBloc go directly to the user without a percantage being taken.

## Features

1. Post images for other
2. Purchase images for viewing
3. Rate posts to inform other users
4. Search posts by keyword
5. Profile to display posts posted and owned

## Getting Started

### Installation and Setup

1. Clone repository locally and navigate into the `/appui/` folder, then run:

   ```bash
   npm install
   ```

2. Navigate to the `/myBloc/` folder, then run:

   ```bash
   npm install @truffle/hdwallet-provider

   npm install -g ganache-cli
   ```

### Run

1.  Open a terminal and run:
    ```bash
    ganache-cli
    ```
2.  Scroll to the top of the `ganche-cli` output and find the first account id

    Example (values will differ):

    ![Ganache CLI Output](/images/Ganache-CLI-Output.png)

3.  Copy the first account's id

4.  Navigate to and open `/appui/src/config.js`

5.  Replace the variable value of `account0` to your id.

        `let account0 = "<YOUR ACCOUNT0 ID>";`

6.  Navigate to `/myBloc/` and run:

    ```bash
    truffle migrate
    ```

    You should notice the contract being deployed on your local Etheruem blockchain by looking at the `ganache-cli`.

7.  Once the deployment has finished, you will see the following:

    ![Truffle Migrate Deployment Output](/images/Truffle-Migrate-Output.png)

    Copy the contract address.

8.  Navigate to and open `/appui/src/config.js`

9.  Replace the variable value of `myBlocAddress` to your id.

        `let myBlocAddress = "<YOUR MYBLOC CONTRACT ADDRESS>";`

10. Navigate to `/appui/` and run

    ```bash
        npm start
    ```

11. The application UI will now be open in your browser and connected to the smart contract. If you want to change which account you are using, then simply change the `account0` variable in `config.js` to any existing account on the local `ganache` Etheruem blockchain.

## Demo video

[![Demo Video](https://img.youtube.com/vi/pt4bprY6bd8/0.jpg)](https://www.youtube.com/watch?v=pt4bprY6bd8)

## Contributors

- Tomas Surna
- Phil Roesch
