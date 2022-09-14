package com.farmding.api.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.farmding.db.entity.Like;
import com.farmding.db.entity.Project;
import com.farmding.service.FundingService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/api/funding")
public class FundingController {
	
	private FundingService fundingService;
	
	@Autowired
	public FundingController(FundingService fundingService) {
		this.fundingService = fundingService;
	}
	
	@GetMapping("/projects")
	@ApiOperation(value = "프로젝트 객체", notes = "프로젝트 객체 전부 보내기")
	@ApiResponses({ @ApiResponse(code = 200, message = "가져오기 성공"), @ApiResponse(code = 400, message = "400에러"),
			@ApiResponse(code = 409, message = "409에러"), @ApiResponse(code = 500, message = "500에러") })
	public ResponseEntity<?> projectList() throws Exception {
		List<Project> projectData = fundingService.ProjectList();
		return new ResponseEntity<List<Project>>(projectData,HttpStatus.OK);
	}
	
	@GetMapping("/popular_fundings")
	@ApiOperation(value = "프로젝트 객체 8개", notes = "프로젝트 객체 중 Funder 수 순으로 상위 8개만 보냅니다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "가져오기 성공"), @ApiResponse(code = 400, message = "400에러"),
		@ApiResponse(code = 409, message = "409에러"), @ApiResponse(code = 500, message = "500에러") })
	public ResponseEntity<?> projectListTopEight() throws Exception {
		List<Project> projectData = fundingService.ProjectListTopEight();
		return new ResponseEntity<List<Project>>(projectData,HttpStatus.OK);
	}
	
	@GetMapping("/like/{userId}")
	@ApiOperation(value = "like 데이터", notes = "like")
	@ApiResponses({ @ApiResponse(code = 200, message = "가져오기 성공"), @ApiResponse(code = 400, message = "400에러"),
		@ApiResponse(code = 409, message = "409에러"), @ApiResponse(code = 500, message = "500에러") })
	public ResponseEntity<?> zzimFunding(@PathVariable int userId) throws Exception {
		List<Like> likeData = fundingService.likeFunding(userId);
		List<Project> list = fundingService.getUserLikeProject(likeData);

		return new ResponseEntity<List<Project>>(list,HttpStatus.OK);
	}
}
