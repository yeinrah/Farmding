package com.farmding.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
