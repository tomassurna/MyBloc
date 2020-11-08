pragma solidity >=0.5.0 <0.8.0;

contract MyBlock {
    mapping (address => uint[]) private users;
    mapping (uint => Post) private posts;
    
    struct Post{
        bytes32 post;
        address owner;
        bytes32 description;
        uint fee;
        uint likes;
        uint dislikes;
        mapping (address => bool) votes;
    }
    
    function pushPost(bytes32 post, string memory description, uint fee) public{
        
    }
    
    function ratePost(uint postID, bool like) public{
        
    }
    
    function buyPost(uint postID) public returns(bytes32 description){
        
    }
    
    function searchPost(string memory search) public returns(bytes32[] memory descriptions){
        
    }
    
    function stringToBytes32(string memory s) private returns (bytes32){
        
    }

    function bytes32ToString(string memory s) private returns (bytes32){
        
    }
    
}