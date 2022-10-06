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
@ApiModel("NftUpdateCurReq")
public class NftUpdateCurReq {
	
	@ApiModelProperty(name = "NFT 가격", example = "10.1")
	@NotNull(message = "현재NFT가격을 입력하세요.")
	private double currentPrice;
	
	@ApiModelProperty(name = "count", example = "1")
	@NotNull(message = "count를 입력하세요")
	private int count;


}