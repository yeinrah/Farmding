package com.farmding.api.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.farmding.api.response.FundingDetailRes;
import com.farmding.db.entity.Images;
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
	public ResponseEntity<?> likeFunding(@PathVariable int userId) throws Exception {
		List<Like> likeData = fundingService.likeFunding(userId);
		List<Project> list = fundingService.getUserLikeProject(likeData);

		return new ResponseEntity<List<Project>>(list,HttpStatus.OK);
	}
	
	
	@GetMapping("/funding/{projectId}")
	@ApiOperation(value = "펀딩 상세 페이지", notes = "상세 페이지 구현에 필요한 프로젝트 데이터와 이미지 데이터를 보내준다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "가져오기 성공"), @ApiResponse(code = 400, message = "400에러"),
		@ApiResponse(code = 409, message = "409에러"), @ApiResponse(code = 500, message = "500에러") })
	public ResponseEntity<HashMap<String,Object>> fundingDetail(@PathVariable int projectId) throws Exception {
		Project project = fundingService.FindOneByProjectId(projectId);
		List<Images> list = fundingService.FindAllImageByProjectId(projectId);
		
		HashMap<String, Object> result = new HashMap<>();
		result.put("project", project);
		result.put("images", list);
//		FundingDetailRes fundingRes = new FundingDetailRes(project, list);
//		return new ResponseEntity<FundingDetailRes>(fundingRes,HttpStatus.OK);
		return new ResponseEntity<HashMap<String, Object>>(result,HttpStatus.OK);
	}
	
	@GetMapping("detail/{project_id}")
	@ApiOperation(value = "펀딩 상세페이지 모달", notes = "상세페이지에 필요한 데이터를 보내준다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "가져오기 성공"), @ApiResponse(code = 400, message = "400에러"),
		@ApiResponse(code = 409, message = "409에러"), @ApiResponse(code = 500, message = "500에러") })
	public ResponseEntity<?> detailFunding(@PathVariable int userId) throws Exception {
		List<Like> likeData = fundingService.likeFunding(userId);
		List<Project> list = fundingService.getUserLikeProject(likeData);

		return new ResponseEntity<List<Project>>(list,HttpStatus.OK);
	}
	
	//펀딩모달 SSF얼마씩쓰는지 이거 api 만들기 
}
