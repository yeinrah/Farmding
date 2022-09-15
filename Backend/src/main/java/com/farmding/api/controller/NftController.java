package com.farmding.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.farmding.db.entity.Nft;
import com.farmding.service.NftService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("api")
public class NftController {
	@Autowired
	private NftService nftService;

	@Autowired
	public NftController(NftService nftService) {
		this.nftService = nftService;
	}

	@GetMapping("/deals")
	@ApiOperation(value = "NFT 객체", notes = "NFT 객체 전부 보내기")
	@ApiResponses({ @ApiResponse(code = 200, message = "가져오기 성공"), @ApiResponse(code = 400, message = "400 Error"),
			@ApiResponse(code = 409, message = "409 Error"), @ApiResponse(code = 500, message = "500 Error") })
	public ResponseEntity<?> nftList() throws Exception {
		List<Nft> nftData = nftService.NftList();
		return new ResponseEntity<List<Nft>>(nftData, HttpStatus.OK);
	}
}