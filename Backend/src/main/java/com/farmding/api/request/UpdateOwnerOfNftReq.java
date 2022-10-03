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
@ApiModel("UpdateOwnerOfNftReq")
public class UpdateOwnerOfNftReq {
	
	@ApiModelProperty(name = "ownerNickname", example = "쭈글이")
	@NotNull(message = "ownerNickname을 입력하세요.")
	private String ownerNickname;
	
	@ApiModelProperty(name = "ownerWalletAddress", example = "0x02u042903274")
	@NotNull(message = "ownerWalletAddress 를 입력하세요")
	private String ownerWalletAddress;

	@ApiModelProperty(name = "count", example = "1")
	@NotNull(message = "count를 입력하세요")
	private int count;


}