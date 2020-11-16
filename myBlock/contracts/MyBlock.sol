pragma solidity >=0.5.0 <0.8.0;
pragma experimental ABIEncoderV2;

contract MyBlock {
    struct Post {
        uint256 id;
        //bytes32 post;
        address payable owner;
        string description;
        uint256 fee;
        uint256 likes;
        uint256 dislikes;
        mapping(address => bool) payed;
        mapping(address => bool) liked;
    }

    struct PostDetails {
        uint256 id;
        string description;
        uint256 fee;
        uint256 likes;
        uint256 dislikes;
    }

    mapping(address => uint256[]) private users;
    mapping(uint256 => Post) private posts;
    uint256 private n_posts;
    uint256[] public postIdList;

    constructor() public {
        n_posts = 0;
    }

    /**TODO - actual post implementation, current supports string description to post
     * @dev push a post to MyBlock
     * @param description - string description of post
     * @param fee - int cost to access post
     */
    function pushPost(string memory description, uint256 fee)
        public
        returns (bool)
    {
        Post memory newPost = Post({
            id: n_posts, // TODO: INITIALIZE POST ITSELF
            owner: msg.sender,
            description: description,
            fee: fee,
            likes: 0,
            dislikes: 0
        });
        posts[newPost.id] = newPost;
        postIdList.push(newPost.id);
        users[msg.sender].push(newPost.id);
        n_posts++;

        return true;
    }

    /**TODO - actual post implementation, current supports strings description return
     * @dev buy a post and pay owner
     * @param postID - ID of post to buy
     *
     */
    function viewPost(uint256 postID) public payable returns (string memory) {
        require(postID >= 0 && postID < n_posts, "INVALID POST ID");
        Post storage p = posts[postID];

        if (!p.payed[msg.sender] || msg.sender == p.owner) {
            require(msg.value >= p.fee, "Need to pay at least minimum of fee");
            p.owner.transfer(msg.value);
            p.payed[msg.sender] = true;
        }

        return p.description;
    }

    /**
     * @dev rate a post positively or negatively
     * @param postID - ID of post to like or dislike
     * @param like - determines if post is to be liked or disliked
     */
    function ratePost(uint256 postID, bool like) public {
        require(postID >= 0 && postID < n_posts, "INVALID POST ID");
        Post storage p = posts[postID];
        require(p.payed[msg.sender], "POST NOT PURCHASED");
        require(!p.liked[msg.sender], "POST ALREADY RATED");
        if (like) {
            p.likes++;
        } else {
            p.dislikes++;
        }
        p.liked[msg.sender] = true;
    }

    /**
     * @dev returns description of specified post
     * @param postID - ID of post to return
     * @return description of a respective post
     */
    function getDescription(uint256 postID) public view returns (bytes32) {
        require(postID >= 0 && postID < n_posts, "INVALID POST ID");
        return stringToBytes32(posts[postID].description);
    }

    /**
     * @dev returns uint of likes of specified post
     * @param postID - ID of post to return
     * @return likes of a respective post
     */
    function getLikes(uint256 postID) public view returns (uint256) {
        require(postID >= 0 && postID < n_posts, "INVALID POST ID");
        return posts[postID].likes;
    }

    /**
     * @dev returns uint of dislikes of specified post
     * @param postID - ID of post to return
     * @return dislikes of a respective post
     */
    function getDislikes(uint256 postID) public view returns (uint256) {
        require(postID >= 0 && postID < n_posts, "INVALID POST ID");
        return posts[postID].dislikes;
    }

    function getPostDetails(uint256 postID)
        public
        view
        returns (PostDetails memory)
    {
        require(postID >= 0 && postID < n_posts, "INVALID POST ID");
        Post storage p = posts[postID];

        return
            PostDetails({
                id: p.id,
                description: p.description,
                fee: p.fee,
                likes: p.likes,
                dislikes: p.dislikes
            });
    }

    /**TODO
     * @dev searches for post based on description
     * @param search - description to search for
     */
    function searchPost(string memory search)
        public
        returns (bytes32[] memory)
    {}

    /**
     * @dev utility method to conver string to bytes32
     * @param source string to convert
     * @return result
     * Notes:
     *      source - https://ethereum.stackexchange.com/questions/9142/how-to-convert-a-string-to-bytes32
     */
    function stringToBytes32(string memory source)
        private
        pure
        returns (bytes32 result)
    {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }
}
