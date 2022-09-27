package com.farmding.api.request;

import javax.validation.constraints.NotNull;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UpdateAddressReq")
public class UpdateAddressReq {
	@ApiModelProperty(name = "유저 Address", example = "서울시 강남구")
	@NotNull(message = "주소를 입력하세요.")
	private String address;
}
