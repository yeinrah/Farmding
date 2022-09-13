package com.farmding.api.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.farmding.api.request.UserRegisterReq;
import com.farmding.service.UserService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("api/user")
public class UserRestController {
	
	private UserService userService;
	
	@PostMapping("/join")
	@ApiOperation(value = "회원 정보 등록", notes = "지갑주소, 닉네임, 집주소와 우편번호를 통해 회원 정보를 등록한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "등록 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 409, message = "수정 실패"), @ApiResponse(code = 500, message = "정보 중복(등록 불가)") })
	public ResponseEntity<?> signup(@RequestBody UserRegisterReq userRegisterReq) throws Exception {

		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	
	@GetMapping("/mypage/{user_id}")
	@ApiOperation(value = "마이페이지", notes = "지갑주소를 통해 마이페이지를 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "조회 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 409, message = "조회 실패"), @ApiResponse(code = 500, message = "조회 실패") })
	public ResponseEntity<?> showmypage(@PathVariable int id) throws Exception {

		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	
	@PatchMapping("/updateaddress/{user_id}")
	@ApiOperation(value = "회원 배송지 수정", notes = "집주소와 우편번호를 수정한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "수정 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 409, message = "수정 실패"), @ApiResponse(code = 500, message = "수정 실패") })
	public ResponseEntity<?> updateaddress(@PathVariable int id) throws Exception {

		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	@PatchMapping("/updateprofile/{user_id}")
	@ApiOperation(value = "회원 프로필 사진 수정", notes = "회원 프로필 사진을 수정한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "수정 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 409, message = "수정 실패"), @ApiResponse(code = 500, message = "수정 실패") })
	public ResponseEntity<?> updateprofileimage(@PathVariable int id) throws Exception {

		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	@PatchMapping("/delete/{user_id}")
	@ApiOperation(value = "회원 탈퇴", notes = "회원이 탈퇴된다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "등록 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 409, message = "탈퇴 실패"), @ApiResponse(code = 500, message = "탈퇴 실패") })
	public ResponseEntity<?> withdraw(@PathVariable int id) throws Exception {

		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	
	@GetMapping("/myproject")
	@ApiOperation(value = "회원 자신이 후원한 프로젝트", notes = "회원이 자신이 후원한 프로젝트를 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "조회 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 409, message = "조회 실패"), @ApiResponse(code = 500, message = "조회 실패") })
	public ResponseEntity<?> showmyproject() throws Exception {

		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	@GetMapping("/mynft")
	@ApiOperation(value = "회원의 NFT", notes = "회원의 NFT 정보를 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "조회 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 409, message = "조회 실패"), @ApiResponse(code = 500, message = "조회 실패") })
	public ResponseEntity<?> showNFT() throws Exception {

		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	
	
}
