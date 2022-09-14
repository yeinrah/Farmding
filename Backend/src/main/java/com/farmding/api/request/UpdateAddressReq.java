package com.farmding.api.request;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

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

	@ApiModelProperty(name = "유저 Zipcode", example = "01010")
	@NotNull(message = "우편번호를 입력하세요")
	@Pattern(regexp = "[0-6][0-3]\\d{3}", message = "올바른 우편번호를 입력해주세요.")
	private String zipCode;
}
