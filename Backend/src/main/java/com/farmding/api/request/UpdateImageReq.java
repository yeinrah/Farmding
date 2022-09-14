package com.farmding.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@ApiModel("UpdateImageReq")
public class UpdateImageReq {
	@ApiModelProperty(name = "유저 프로필 이미지 인덱스", example = "0")
	@NotNull(message = "바꾸고 싶은 프로필 이미지 인덱스를 입력하세요.")
	@Pattern(regexp = "^([0-9]|1[0-9]|2[0-4])$", message = "0~24 사이의 숫자를 입력해주세요.")
	private int profileImage;
}