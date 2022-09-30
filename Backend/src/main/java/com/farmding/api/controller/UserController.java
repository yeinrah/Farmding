package com.farmding.api.controller;

import java.util.HashMap;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.farmding.api.request.UpdateAddressReq;
import com.farmding.api.request.UpdateImageReq;
import com.farmding.api.request.UpdatePhoneReq;
import com.farmding.api.request.UpdateProfileReq;
import com.farmding.api.request.UserRegisterReq;
import com.farmding.service.UserService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("api/user")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/join")
	@ApiOperation(value = "회원 정보 등록", notes = "지갑주소, 닉네임, 집주소와 우편번호를 통해 회원 정보를 등록한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "등록 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 409, message = "수정 실패"), @ApiResponse(code = 500, message = "정보 중복(등록 불가)") })
	public ResponseEntity<?> signup(@RequestBody UserRegisterReq userRegisterReq) throws Exception {
		userService.checkNicknameDuplication(userRegisterReq);
		userService.signup(userRegisterReq);
		return new ResponseEntity<String>(HttpStatus.OK);
	}

//	@GetMapping("/mypage/{user_id}")
//	@ApiOperation(value = "마이페이지", notes = "지갑주소를 통해 마이페이지를 조회한다.")
//	@ApiResponses({ @ApiResponse(code = 200, message = "조회 성공"), @ApiResponse(code = 400, message = "입력 오류"),
//			@ApiResponse(code = 409, message = "조회 실패"), @ApiResponse(code = 500, message = "조회 실패") })
//	public ResponseEntity<?> showmypage(@PathVariable int user_id) throws Exception {
//		HashMap<String, Object> user = userService.findUserFunding(user_id);
//		return new ResponseEntity<>(user, HttpStatus.OK);
//	}

	@PatchMapping("/updateaddress/{wallet_address}")
	@ApiOperation(value = "회원 배송지 수정", notes = "집주소와 우편번호를 수정한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "수정 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 409, message = "수정 실패"), @ApiResponse(code = 500, message = "수정 실패") })
	public ResponseEntity<?> updateaddress(@PathVariable String wallet_address,
			@Valid @RequestBody UpdateAddressReq updateAddressReq) throws Exception {
		userService.updateAddress(wallet_address, updateAddressReq);
		return new ResponseEntity<String>(HttpStatus.OK);
	}

	@PatchMapping("/updateprofile/{wallet_address}")
	@ApiOperation(value = "회원 프로필 사진 수정", notes = "회원 프로필 사진을 수정한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "수정 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 409, message = "수정 실패"), @ApiResponse(code = 500, message = "수정 실패") })
	public ResponseEntity<?> updateprofileimage(@PathVariable String wallet_address, @RequestBody UpdateImageReq updateImageReq)
			throws Exception {
		userService.updateImage(wallet_address, updateImageReq);
		return new ResponseEntity<String>(HttpStatus.OK);
	}

	@PatchMapping("/updateuserpr/{wallet_address}")
	@ApiOperation(value = "회원 프로필정보 수정", notes = "회원 닉네임, 자기소개를 수정한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "수정 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 409, message = "수정 실패"), @ApiResponse(code = 500, message = "수정 실패") })
	public ResponseEntity<?> updateprofileimage(@Valid @RequestBody UpdateProfileReq updateProfileReq) throws Exception {
		userService.updateProfile(updateProfileReq);
		return new ResponseEntity<String>(HttpStatus.OK);
	}

	@PatchMapping("/updateuserphone/{wallet_address}")
	@ApiOperation(value = "회원 전화번호 수정", notes = "회원 전화번호를 수정한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "수정 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 409, message = "수정 실패"), @ApiResponse(code = 500, message = "수정 실패") })
	public ResponseEntity<?> updateuserphone(@PathVariable String wallet_address,
			@Valid @RequestBody UpdatePhoneReq updatePhoneReq) throws Exception {
		userService.updatePhone(wallet_address, updatePhoneReq);
		return new ResponseEntity<String>(HttpStatus.OK);
	}

	@PatchMapping("/delete/{wallet_address}")
	@ApiOperation(value = "회원 탈퇴", notes = "회원이 탈퇴된다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "탈퇴 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 409, message = "탈퇴 실패"), @ApiResponse(code = 500, message = "탈퇴 실패") })
	public ResponseEntity<?> withdraw(@PathVariable String wallet_address) throws Exception {
		userService.updateUserState(wallet_address);
		return new ResponseEntity<String>(HttpStatus.OK);
	}

	@GetMapping("/mypage/myproject/{wallet_address}")
	@ApiOperation(value = "회원 자신이 후원한 펀딩프로젝트", notes = "회원이 자신이 후원한 프로젝트를 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "조회 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 409, message = "조회 실패"), @ApiResponse(code = 500, message = "조회 실패") })
	public ResponseEntity<?> showmyproject(@PathVariable String wallet_address) throws Exception {
		HashMap<String, Object> user = userService.findUserFunding(wallet_address);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	@GetMapping("/mypage/mynft/{wallet_address}")
	@ApiOperation(value = "회원의 NFT", notes = "회원의 NFT 정보를 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "조회 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 409, message = "조회 실패"), @ApiResponse(code = 500, message = "조회 실패") })
	public ResponseEntity<?> showNFT(@PathVariable String wallet_address) throws Exception {
		HashMap<String, Object> user = userService.findUserNFT(wallet_address);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	@GetMapping("/confirm/{wallet_address}")
	@ApiOperation(value = "지갑주소로 회원정보 유무 조회", notes = "지갑주소로 회원정보 유무를 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "조회 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 409, message = "조회 실패"), @ApiResponse(code = 500, message = "조회 실패") })
	public ResponseEntity<?> checkUserByWA(@PathVariable String wallet_address) throws Exception {
		boolean checkUserWA = userService.findUserByWA(wallet_address);
		return new ResponseEntity<>(checkUserWA, HttpStatus.OK);
	}
	
//	@GetMapping("/confirm/nickname/{nickname}")
//	@ApiOperation(value = "닉네임으로 회원정보조회", notes = "닉네임으로 회원정보를 조회한다")
//	@ApiResponses({ @ApiResponse(code = 200, message = "조회 성공"), @ApiResponse(code = 400, message = "입력 오류"),
//			@ApiResponse(code = 409, message = "조회 실패"), @ApiResponse(code = 500, message = "조회 실패") })
//	public ResponseEntity<?> checkUserByNickName(@PathVariable String nickname) throws Exception {
//		boolean checkUserNN = userService.findUserByNN(nickname);
//		return new ResponseEntity<>(checkUserNN, HttpStatus.OK);
//	}
	
	@GetMapping("/confirm/checkuser/{nickname}")
	@ApiOperation(value = "닉네임 중복검사", notes = "닉네임 중복 여부를 확인한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "조회 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 409, message = "조회 실패"), @ApiResponse(code = 500, message = "조회 실패") })
	public ResponseEntity<?> checkUserDuplicate(@PathVariable String nickname) throws Exception {
		boolean checkUserNN = userService.onlyCheckNicknameDuplication(nickname);
		return new ResponseEntity<>(checkUserNN, HttpStatus.OK);
	}

}
