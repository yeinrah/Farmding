// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./access/Ownable.sol";
import "./token/ERC20/ERC20.sol";
import "./token/ERC721/ERC721.sol";
import "./SsafyNFT.sol";
import "./SsafyToken.sol";
import "./NFT.sol";

/**
 * PJT Ⅲ - Req.1-SC1 DealFactory 구현
 */
contract DealFactory is Ownable {
    address public admin;
    address[] public deals;

    IERC20 public erc20Contract;
    IERC721 public erc721Contract;

    event NewDeal(
        address indexed _dealContract,
        address indexed _owner,
        uint256 _workId
    );

    event UpdateDealCreated(
        address dealContractAddress,
        address seller,
        address currencyAddress,
        uint256 tokenId,
        uint256 purchasePrice,
        uint256 dealstartTime,
        uint256 dealendTime
    );

    constructor(address _currencyAddress, address _NFTmintAddress) {
        admin = msg.sender;
      
        erc20Contract = IERC20(_currencyAddress);
        erc721Contract = IERC721(_NFTmintAddress);
    }

    function getDealAddress(uint256 tokenId) public view returns(address){
        return deals[tokenId];
    }

    function createDeal(
        address nftAddress,
        address seller,
        address currencyAddress,
        uint256 tokenId,
        uint256 purchasePrice,
        uint256 startTime,
        uint256 endTime
    ) public returns (Deal updateDealContract) {
        // TODO
        erc20Contract = IERC20(currencyAddress);
        erc721Contract = IERC721(nftAddress);

        erc721Contract.transferFrom(seller, address(this), tokenId);

        updateDealContract = new Deal (
            admin,
            seller,
            currencyAddress,
            nftAddress,
            tokenId,
            purchasePrice,
            startTime,
            endTime
        );

        erc721Contract.transferFrom(address(this), address(updateDealContract), tokenId);

        deals[tokenId] = address(updateDealContract);

        emit UpdateDealCreated(address(updateDealContract), seller, currencyAddress, tokenId, purchasePrice, startTime, endTime);
        
        return updateDealContract;
    }

    function allDeals() public view returns (address[] memory) {
        return deals;
    }
}


contract Deal {
    // 생성자에 의해 정해지는 값
    address admin;
    address public seller;
    address public buyer;
    address public currencyAddress;
    address public nftAddress;
    uint256 public dealStartTime;
    uint256 public dealEndTime;
    uint256 public purchasePrice;
    uint256 public tokenId;
    bool public ended;

    IERC20 public erc20Contract;
    IERC721 public erc721Constract;

    event DealEnded(
        address dealContractAddress,
        address seller,
        uint256 tokenId,
        uint256 amount
        );

    constructor(
        address _admin,
        address _seller,
        address _currencyAddress,
        address _nftAddress,
        uint256 _tokenId,
        uint256 _purchasePrice,
        uint256 startTime,
        uint256 endTime
    ) {
        require(_purchasePrice > 0);
        admin = _admin;
        seller = _seller;
        currencyAddress = _currencyAddress;
        nftAddress = _nftAddress;
        tokenId = _tokenId;
        purchasePrice = _purchasePrice;
        dealStartTime = startTime;
        dealEndTime = endTime;
        ended = false;
        erc20Contract = IERC20(_currencyAddress);
        erc721Constract = IERC721(_nftAddress);
    }

    function purchase() public {
        // TODO
        address _puchaser = msg.sender;
    }

    function confirmItem() public {
        // TODO 
    }
    
    // function cancelDeals() public returns(bool) {
    //     address request = msg.sender;
    //     require(request == admin || request == seller, "Do not allowed permission");

    //     erc721Constract.transferFrom(address(this), seller, tokenId);
    //     _end();

    //     emit DealEnded(address(this), address(0), tokenId,0);
    //     return true;
    // }

    function getTimeLeft() public view returns (int256) {
        return (int256)(dealEndTime - block.timestamp);
    }

    function getDealInfo()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            address,
            address
        )
    {
        return (
            dealStartTime,
            dealEndTime,
            purchasePrice,
            tokenId,
            currencyAddress,
            nftAddress
        );
    }

    // internal 혹은 private 함수 선언시 아래와 같이 _로 시작하도록 네이밍합니다.
    function _end() internal {
        ended = true;
    }

    function _getCurrencyAmount() private view returns (uint256) {
        return erc20Contract.balanceOf(msg.sender);
    }

    // modifier를 사용하여 함수 동작 조건을 재사용하는 것을 권장합니다. 
    modifier onlySeller() {
        require(msg.sender == seller, "Deal: You are not seller.");
        _;
    }

    modifier onlyAfterStart() {
        require(
            block.timestamp >= dealStartTime,
            "Deal: This Deal is not started."
        );
        _;
    }
}
