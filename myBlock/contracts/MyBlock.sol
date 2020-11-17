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
        //post;
        string description;
        uint256 fee;
        uint256 likes;
        uint256 dislikes;
    }

    struct Profile{
        uint256[] posted;
        uint256[] owned;
    }

    mapping(address => uint256[]) private users;
    mapping(uint256 => Post) private posts;
    uint256 public n_posts;

    constructor() public {
        n_posts = 1;
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

        return p.description; // replace with post data
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
     * @dev return details of a post
     * @param postID - ID of post for which details are returned
     * @return PostDetails */
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

    /**
     * @dev searches for post based on description
     * @param _search - description to search for
     */
    function searchPost(string memory _search, uint256 start)
        public
        returns (uint256)
    {
        bytes32 search = stringToBytes32(_search);
        
        while(start < n_posts){
            if (stringToBytes32(posts[start].description)==search){
                return(posts[start].id);
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
