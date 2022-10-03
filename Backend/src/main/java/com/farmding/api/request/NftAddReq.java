package com.farmding.api.request;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("NftAddReq")
public class NftAddReq {
	
	@ApiModelProperty(name = "NFT 발급이 된 펀딩 ID", example = "1")
	@NotNull(message = "펀딩 ID를 입력하세요.")
	private int fundingId;
	
	@ApiModelProperty(name = "NFT 주소", example = "0x4323aaaa222222aaaa3333aaaa2222aa")
	@NotNull(message = "NFT 주소를 입력하세요.")
	private String nftAddress;
	
	@ApiModelProperty(name = "소유자 지갑주소", example = "0x4323aaaa222222aaaa3333aaaa2222aa")
	@NotNull(message = "지갑 주소를 입력하세요.")
	private String ownerWalletAddress;
	
	@ApiModelProperty(name = "판매여부", example = "false")
	@NotNull(message = "판매여부를 입력하세요.")
	private boolean onSale;
	
	@ApiModelProperty(name = "NFT 가격", example = "10.1")
	@NotNull(message = "현재NFT가격을 입력하세요.")
	private double currentPrice;
	
	@ApiModelProperty(name = "유저 Nickname", example = "Harry")
	@NotNull(message = "닉네임을 입력하세요.")
	@Pattern(regexp = "^[0-9a-zA-Z가-힣]*$", message = "닉네임은 숫자, 영어, 한글만 가능하며 1자 ~ 50자의 닉네임이 가능합니다.")
	@Size(min = 1, max = 50)
	private String ownerNickname;
	
	@ApiModelProperty(name = "count를 입력하세요", example = "1")
	@NotNull(message = "count를 입력하세요.")
	private int count;

}