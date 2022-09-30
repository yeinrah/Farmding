package com.farmding.api.request;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@ApiModel("UpdateNProfileReq")
public class UpdateProfileReq {
	
	@ApiModelProperty(name = "walletAddress", example = "0x4323aaaa222222aaaa3333aaaa2222aa")
	private String walletAddress;
	
	@ApiModelProperty(name = "유저 Nickname", example = "Harry")
	@NotNull(message = "닉네임 칸을 채워주세요.")
	@Pattern(regexp = "^[0-9a-zA-Z가-힣]*$", message = "닉네임은 숫자, 영어, 한글만 가능하며 1자 ~ 50자의 닉네임이 가능합니다.")
	@Size(min = 1, max = 50)
	private String nickname;

	@ApiModelProperty(name = "유저 자기소개", example = "저는 사과를 좋아해요")
	private String userPr;
	
}