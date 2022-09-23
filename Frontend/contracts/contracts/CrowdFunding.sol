pragma solidity >=0.7.0 <0.9.0;

interface IERC20 {
    function transfer(address, uint) external returns (bool);

    function transferFrom(
        address,
        address,
        uint
    ) external returns (bool);
}

contract SsafyToken is ERC20, Ownable{
    
  constructor(string memory name, string memory symbol, uint8 decimal) ERC20(name, symbol, decimal) {}
  
  function mint(uint256 amount) public onlyOwner{
      _mint(_msgSender(), amount);
  }
  
  function forceToTransfer(address from, address to, uint256 amount) public onlyOwner{
      _transfer(from, to, amount);
  }
}

contract CrowdFunding{
  SsafyToken public SSFTokenContract;
  // IERC20 public erc20Contract;

  struct Funder {
    address _addr;
    // string _name;
    uint _amount;
  }

  event Launch(
      uint id,
      address indexed beneficiary,
      uint goal,
      uint32 startAt,
      uint32 endAt
  );
  event Cancel(uint id);
  event Pledge(uint indexed id, address indexed caller, uint amount);
  event Unpledge(uint indexed id, address indexed caller, uint amount);
  event Claim(uint id);
  event Refund(uint id, address indexed caller, uint amount);


  struct Campaign {
    // Creator(beneficiary) of campaign
    address beneficiary;
    // Amount of tokens to raise
    uint goal;
    // uint numFunders;
    // Total amount pledged(funded)
    uint pledged;
    // Timestamp of start of campaign
    uint32 startAt;
    // Timestamp of end of campaign
    uint32 endAt;
    // True if goal was reached and creator has claimed the tokens.
    bool claimed;
    // mapping (uint => Funder) funders;
  }

  // IERC20 public immutable token;


  // Total count of campaigns created.
  // It is also used to generate id for new campaigns.
  uint public campaignsCount;

  // Mapping from id to Campaign
  //  key를 uint, value를 Campaign 구조체로 갖는 mapping(객체 같은 것)을 만들고
  // 이런 map을 campaigns라는 이름의 state 변수로 선언.
  // { 1: Campaign, 2: Campaign ...}
  mapping(uint => Campaign) public campaigns;

  // Mapping from campaign id => pledger => amount pledged
  mapping(uint => mapping(address => uint)) public pledgedAmount;

  // constructor(address _token) { 
  //     token = IERC20(_token);
  // }
  constructor(address  _currencyAddress) { 
    SSFTokenContract = SsafyToken(_currencyAddress);
  }

  function launch(
      uint _goal,
      uint32 _startAt,
      uint32 _endAt
  ) external {
      require(_startAt >= block.timestamp, "start at < now");
      require(_endAt >= _startAt, "end at < start at");
      require(_endAt <= block.timestamp + 90 days, "end at > max duration");

      campaignsCount += 1;
      campaigns[campaignsCount] = Campaign({
          beneficiary: msg.sender,
          goal: _goal,
          // numFunders: 0,
          pledged: 0,
          startAt: _startAt,
          endAt: _endAt,
          claimed: false
      });

      emit Launch(campaignsCount, msg.sender, _goal, _startAt, _endAt);
  }

  
  function cancel(uint _id) external {
      Campaign memory campaign = campaigns[_id];
      require(campaign.beneficiary == msg.sender, "not beneficiary");
      require(block.timestamp < campaign.startAt, "started");

      delete campaigns[_id];
      emit Cancel(_id);
  }


  function pledge(uint _id, uint _amount) external {
      Campaign storage campaign = campaigns[_id];
      require(block.timestamp >= campaign.startAt, "not started");
      require(block.timestamp <= campaign.endAt, "ended");
      // campaign.funders[campaign.numFunders++] = Funder({addr: msg.sender, amount: msg.value});
      campaign.pledged += _amount;
      pledgedAmount[_id][msg.sender] += _amount;

      SSFTokenContract.approve(msg.sender, _amount)
      SSFTokenContract.transferFrom(msg.sender, address(this), _amount)
      // token.transferFrom(msg.sender, address(this), _amount);

      emit Pledge(_id, msg.sender, _amount);
  }


  function unpledge(uint _id, uint _amount) external {
      Campaign storage campaign = campaigns[_id];
      require(block.timestamp <= campaign.endAt, "ended");

      campaign.pledged -= _amount;
      pledgedAmount[_id][msg.sender] -= _amount;
      token.transfer(msg.sender, _amount);

      emit Unpledge(_id, msg.sender, _amount);
  }

  function claim(uint _id) external {
      Campaign storage campaign = campaigns[_id];
      require(campaign.beneficiary == msg.sender, "not beneficiary");
      require(block.timestamp > campaign.endAt, "not ended");
      require(campaign.pledged >= campaign.goal, "pledged < goal");
      require(!campaign.claimed, "already claimed");

      campaign.claimed = true;
      token.transfer(campaign.beneficiary, campaign.pledged);

      emit Claim(_id);
  }

  function refund(uint _id) external {
      Campaign memory campaign = campaigns[_id];
      require(block.timestamp > campaign.endAt, "not ended");
      require(campaign.pledged < campaign.goal, "pledged >= goal");

      uint bal = pledgedAmount[_id][msg.sender];
      pledgedAmount[_id][msg.sender] = 0;
      token.transfer(msg.sender, bal);

      emit Refund(_id, msg.sender, bal);
  }


  // function newCampaign(address _beneficiary, uint _goalAmount)  public returns (uint campaignID)  {
  //   campaignID = numCampaigns++; 
  //   // campaigns[campaignID] = Campaign(beneficiary, goal, 0, 0);
  // }
  function contribute(uint campaignID) public {
    // Campaign storage c = campaigns[campaignID];
    // c.funders[c.numFunders++] = Funder({addr: msg.sender, amount: msg.value});
    // c.amount += msg.value;
  }

  // function checkGoalReached(uint campaignID) public returns (bool reached) {
  //   // Campaign c = campaigns[campaignID];
  //   // if (c.amount < c.fundingGoal)
  //   //   return false;
  //   // c.beneficiary.send(c.amount);
  //   // c.amount = 0;
  //   // return true;
  // }
}