package com.farmding.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/api/funding")
public class FundingController {
	@GetMapping("/popular_fundings")
	@ApiOperation(value = "인기 프로젝트 가져오기", notes = "인기 프로젝트 8개를 배열로 보내줘야함. 객체 8개가 있는 배열.")
	@ApiResponses({ @ApiResponse(code = 200, message = "가져오기 성공"), @ApiResponse(code = 400, message = "400에러"),
			@ApiResponse(code = 409, message = "409에러"), @ApiResponse(code = 500, message = "500에러") })
	public ResponseEntity<?> signup() throws Exception {
		
		return new ResponseEntity<String>(HttpStatus.OK);
	}
}
