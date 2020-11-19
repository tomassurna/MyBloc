pragma solidity >=0.5.0 <0.8.0;
pragma experimental ABIEncoderV2;

contract MyBlock {
    struct Post {
        uint256 id;
        string ipfsHash;
        address payable owner;
        string description;
        uint256 fee;
        uint256 likes;
        uint256 dislikes;
        mapping(address => bool) rated;
    }

    struct PostDetails {
        uint256 id;
        string description;
        uint256 fee;
        uint256 likes;
        uint256 dislikes;
    }

    struct Profile {
        uint256[] posted;
        mapping(uint256 => bool) purchased;
    }

    mapping(address => Profile) private users;
    mapping(uint256 => Post) private posts;
    uint256 public n_posts;

    constructor() public {
        n_posts = 1;
    }

    /**
     * @dev push a post to MyBlock
     * @param _ipfsHash - hash reference of image
     * @param _description - string description of post
     * @param _fee - int cost to access post
     */
    function pushPost(
        string memory _ipfsHash,
        string memory _description,
        uint256 _fee
    ) public {
        Post storage newPost = posts[n_posts];
        newPost.id = n_posts;
        newPost.ipfsHash = _ipfsHash;
        newPost.owner = msg.sender;
        newPost.description = _description;
        newPost.fee = _fee;
        newPost.likes = 0;
        newPost.dislikes = 0;

        users[msg.sender].posted.push(newPost.id);
        n_posts++;
    }

    /**
        E001 - Invalid post id
        E002 - Already owns post
        E003 - Minnium fee required
        E004 - Do not own post
        E005 - Post already rated
        E006 - Owner cannot vote their post
     */

    /**
     * @dev buy a post and pay owner
     * @param postID - ID of post to buy
     */
    function buyPost(uint256 postID) public payable {
        require(postID > 0 && postID < n_posts, "E001");

        Post storage p = posts[postID];
        require(
            !(users[msg.sender].purchased[postID] || msg.sender == p.owner),
            "E002"
        );

        require(msg.value >= p.fee, "E003");
        p.owner.transfer(msg.value);
        users[msg.sender].purchased[postID] = true;
    }

    /**
     * @dev view a post
     * @param postID - ID of post to view
     * @return string - hash of post
     */
    function viewPost(uint256 postID) public view returns (string memory) {
        require(postID > 0 && postID < n_posts, "E001");

        Post storage p = posts[postID];
        require(
            users[msg.sender].purchased[postID] || msg.sender == p.owner,
            "E004"
        );

        return p.ipfsHash;
    }

    /**
     * @dev rate a post positively or negatively
     * @param postID - ID of post to like or dislike
     * @param like - determines if post is to be rated or disrated
     */
    function ratePost(uint256 postID, bool like) public {
        require(postID >= 0 && postID < n_posts, "E001");
        Post storage p = posts[postID];
        require(p.owner != msg.sender, "E006");
        require(users[msg.sender].purchased[postID], "E004");
        require(!p.rated[msg.sender], "E005");
        if (like) {
            p.likes++;
        } else {
            p.dislikes++;
        }
        p.rated[msg.sender] = true;
    }

    /**
     * @dev return details of a post
     * @param postID - ID of post for which details are returned
     * @return PostDetails */
    function getPostDetails(uint256 postID)
        public
        view
        returns (PostDetails memory)
    {
        require(postID >= 0 && postID < n_posts, "E001");
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

    /**
     * @dev searches for post based on description
     * @param _search - description to search for
     */
    function searchPost(string memory _search, uint256 start)
        public
        view
        returns (uint256)
    {
        bytes32 search = stringToBytes32(_search);

        while (start < n_posts) {
            if (stringToBytes32(posts[start].description) == search) {
                return (posts[start].id);
            }
            start++;
        }
        return 0;
    }

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
