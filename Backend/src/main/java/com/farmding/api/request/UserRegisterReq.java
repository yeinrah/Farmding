package com.farmding.api.request;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import javax.validation.constraints.NotNull;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserRegisterReq")
public class UserRegisterReq {
	
	@ApiModelProperty(name = "유저 지갑주소", example = "0x4323aaaa222222aaaa3333aaaa2222ab")
	@NotNull(message = "지갑 주소를 입력하세요.")
	private String walletAddress;
	
	@ApiModelProperty(name = "유저 phoneNumber", example = "01012345679")
	@NotNull(message = "휴대폰 번호를 입력해주세요.")
	@Pattern(regexp = "(010)(\\d{4})(\\d{4})", message = "올바른 휴대폰 번호를 입력해주세요.")
	private String phoneNumber;
	
	@ApiModelProperty(name = "유저 Nickname", example = "Song")
	@NotNull(message = "닉네임 칸을 채워주세요.")
	@Pattern(regexp = "^[0-9a-zA-Z가-힣]*$", message = "닉네임은 숫자, 영어, 한글만 가능하며 1자 ~ 50자의 닉네임이 가능합니다.")
	@Size(min = 1, max = 50)
	private String nickname;

	@ApiModelProperty(name = "유저 Address", example = "서울시 강남구")
	@NotNull(message = "주소를 입력하세요.")
	private String address;
}
