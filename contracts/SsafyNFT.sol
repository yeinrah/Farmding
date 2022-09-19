// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./token/ERC721/ERC721.sol";
import "./utils/Counters.sol";
import "./access/Ownable.sol";

/**
 * PJT Ⅰ - 과제 2) NFT Creator 구현
 * 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다.
 */
contract SsafyNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => string) tokenURIs;

    event mintingNFT (uint256 indexed _tokenId, address indexed _owner);

    constructor() ERC721("FarmDING", "ProjectByA608"){}

    function current() public view returns (uint256) {
        return Counters.current(_tokenIds);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
         return tokenURIs[tokenId];
    }

    function create(address to, string memory _tokenURI) public returns (uint256) {
        _tokenIds.increment();
        tokenURIs[_tokenIds.current()] = _tokenURI;

        _mint(to, _tokenIds.current());
        emit mintingNFT(_tokenIds.current(), to);
        
        return _tokenIds.current();
        }
}