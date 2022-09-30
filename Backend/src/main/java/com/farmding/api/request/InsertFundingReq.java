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
@ApiModel("InsertFundingReq")
public class InsertFundingReq {
	
	@ApiModelProperty(name = "userId", example = "1")
	@NotNull(message = "userId를 입력하세요")
	private int userId;
	
	@ApiModelProperty(name = "projectId", example = "1")
	@NotNull(message = "projectId를 입력하세요")
	private int projectId;
	
	@ApiModelProperty(name = "rewardId", example = "1")
	@NotNull(message = "rewardId를 입력하세요")
	private int rewardId;
	
	@ApiModelProperty(name = "amount", example = "1")
	@NotNull(message = "amount를 입력하세요")
	private int amount;


}