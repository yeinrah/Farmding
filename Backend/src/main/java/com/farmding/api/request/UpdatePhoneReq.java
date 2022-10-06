package com.farmding.api.request;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UpdatePhoneReq")
public class UpdatePhoneReq {
	@ApiModelProperty(name = "유저 Phone", example = "01012345678")
	@NotNull(message = "휴대폰 번호를 입력해주세요.")
	@Pattern(regexp = "(010)(\\d{4})(\\d{4})", message = "올바른 휴대폰 번호를 입력해주세요.")
	private String phone;
}