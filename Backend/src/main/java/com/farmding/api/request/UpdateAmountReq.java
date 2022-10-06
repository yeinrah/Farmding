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
@ApiModel("UpdateAmountReq")
public class UpdateAmountReq {
	
	@ApiModelProperty(name = "Amount", example = "1")
	@NotNull(message = "Amount를 입력하세요")
	private int amount;
	
	@ApiModelProperty(name = "rewardId", example = "1")
	@NotNull(message = "reward를 입력하세요")
	private int rewardId;


}