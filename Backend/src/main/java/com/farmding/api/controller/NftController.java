package com.farmding.api.controller;

import java.util.List;

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

import com.farmding.api.request.NftAddReq;
import com.farmding.api.request.NftUpdateCurReq;
import com.farmding.api.request.UpdateOwnerOfNftReq;
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
	
	@PostMapping("/addNFT")
	@ApiOperation(value = "NFT 추가", notes = "펀딩ID, NFT주소, 소유자 지갑주소, 판매여부, 현재가격, 소유자 닉네임을 통해 NFT를 추가한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "등록 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 409, message = "수정 실패"), @ApiResponse(code = 500, message = "정보 중복(등록 불가)") })
	public ResponseEntity<?> addNFT(@RequestBody NftAddReq nftAddReq) throws Exception {
		nftService.addNft(nftAddReq);
		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	@PatchMapping("/updateCurrentPrice")
	@ApiOperation(value = "currentPrice 업데이트", notes = "currentPrice 업데이트")
	@ApiResponses({ @ApiResponse(code = 200, message = "가져오기 성공"), @ApiResponse(code = 400, message = "400 Error"),
			@ApiResponse(code = 409, message = "409 Error"), @ApiResponse(code = 500, message = "500 Error") })
	public ResponseEntity<?> updateCurrentPrice(@RequestBody NftUpdateCurReq nftUpdateCurReq) throws Exception {
		nftService.updateCurrentPrice(nftUpdateCurReq.getCurrentPrice(), nftUpdateCurReq.getCount());
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PatchMapping("/updateIsOnSale/{count}")
	@ApiOperation(value = "isonsale업데이트", notes = "isonsale업데이트")
	@ApiResponses({ @ApiResponse(code = 200, message = "가져오기 성공"), @ApiResponse(code = 400, message = "400 Error"),
		@ApiResponse(code = 409, message = "409 Error"), @ApiResponse(code = 500, message = "500 Error") })
	public ResponseEntity<?> updateIsOnSale(@PathVariable int count) throws Exception {
		nftService.updateIsOnSale(count);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/findAllByIsOnSale")
	@ApiOperation(value = "isonsale이 true인걸 리턴", notes = "isonsale이 true인걸 리턴")
	@ApiResponses({ @ApiResponse(code = 200, message = "가져오기 성공"), @ApiResponse(code = 400, message = "400 Error"),
		@ApiResponse(code = 409, message = "409 Error"), @ApiResponse(code = 500, message = "500 Error") })
	public ResponseEntity<?> updateIsOnSale() throws Exception {
		List<Nft> nftIsOnSale = nftService.findAllByIsOnSale(1);
		return new ResponseEntity<List<Nft>>(nftIsOnSale, HttpStatus.OK);
	}
	
	@GetMapping("/countNft")
	@ApiOperation(value = "nft개수 리턴", notes = "nft개수 리턴")
	@ApiResponses({ @ApiResponse(code = 200, message = "가져오기 성공"), @ApiResponse(code = 400, message = "400 Error"),
		@ApiResponse(code = 409, message = "409 Error"), @ApiResponse(code = 500, message = "500 Error") })
	public ResponseEntity<?> countNft() throws Exception {
		int countNft = nftService.countNft();
		return new ResponseEntity<Integer>(countNft, HttpStatus.OK);
	}
	
	@PatchMapping("/updateOwnerOfNft")
	@ApiOperation(value = "updateOwnerOfNft 업데이트", notes = "updateOwnerOfNft 업데이트")
	@ApiResponses({ @ApiResponse(code = 200, message = "가져오기 성공"), @ApiResponse(code = 400, message = "400 Error"),
		@ApiResponse(code = 409, message = "409 Error"), @ApiResponse(code = 500, message = "500 Error") })
	public ResponseEntity<?> updateOwnerOfNft(@RequestBody UpdateOwnerOfNftReq updateOwnerOfNft) throws Exception {
		nftService.updateOwnerOfNft(updateOwnerOfNft.getOwnerNickname(), updateOwnerOfNft.getOwnerWalletAddress(), updateOwnerOfNft.getCount());
		return new ResponseEntity<>(HttpStatus.OK);
	}
}