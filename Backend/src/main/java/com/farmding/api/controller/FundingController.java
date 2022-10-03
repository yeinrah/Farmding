package com.farmding.api.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.farmding.api.request.InsertFundingReq;
import com.farmding.api.request.LikeInsertReq;
import com.farmding.api.request.UpdateAmountReq;
import com.farmding.db.entity.Images;
//import com.farmding.db.entity.Like;
import com.farmding.db.entity.Project;
import com.farmding.db.entity.Reward;
import com.farmding.service.FundingService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/api/funding")
public class FundingController {
	
	@Autowired
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
	
	
	@GetMapping("/{project_id}")
	@ApiOperation(value = "펀딩 상세 페이지", notes = "상세 페이지 구현에 필요한 프로젝트 데이터와 이미지 데이터를 보내준다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "가져오기 성공"), @ApiResponse(code = 400, message = "400에러"),
		@ApiResponse(code = 409, message = "409에러"), @ApiResponse(code = 500, message = "500에러") })
	public ResponseEntity<HashMap<String,Object>> fundingDetail(@PathVariable int project_id) throws Exception {
		Project project = fundingService.FindOneByProjectId(project_id);
		List<Images> list = fundingService.FindAllImageByProjectId(project_id);
		
		HashMap<String, Object> result = new HashMap<>();
		result.put("project", project);
		result.put("images", list);
//		FundingDetailRes fundingRes = new FundingDetailRes(project, list);
//		return new ResponseEntity<FundingDetailRes>(fundingRes,HttpStatus.OK);
		return new ResponseEntity<HashMap<String, Object>>(result,HttpStatus.OK);
	}
	
	@GetMapping("/like/{user_id}")
	@ApiOperation(value = "좋아요한 프로젝트 모달", notes = "좋아요 모달에 필요한 데이터를 보내준다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "가져오기 성공"), @ApiResponse(code = 400, message = "400에러"),
		@ApiResponse(code = 409, message = "409에러"), @ApiResponse(code = 500, message = "500에러") })
	public ResponseEntity<?> detailFunding(@PathVariable int user_id) throws Exception {
		List<Project> list = fundingService.zzimProjectList(user_id);

		return new ResponseEntity<List<Project>>(list,HttpStatus.OK);
	}
	
	//펀딩모달 SSF얼마씩쓰는지 이거 api 만들기 
	@GetMapping("/detail/{project_id}")
	@ApiOperation(value = "reward 정보 가져오기", notes = "projectId를 통해서 reward 데이터를 가져온다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "가져오기 성공"), @ApiResponse(code = 400, message = "400에러"),
		@ApiResponse(code = 409, message = "409에러"), @ApiResponse(code = 500, message = "500에러") })
	public ResponseEntity<?> fundingModal(@PathVariable int project_id) throws Exception {
		
		List<Reward> list = fundingService.findSsfReward(project_id);
		
		return new ResponseEntity<List<Reward>>(list,HttpStatus.OK);
	}
	
	@GetMapping("/detail/MyPageFundingList/{user_id}")
	@ApiOperation(value = "나의 FundingList를 가져온다", notes = "나의 FundingList를 가져온다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "가져오기 성공"), @ApiResponse(code = 400, message = "400에러"),
		@ApiResponse(code = 409, message = "409에러"), @ApiResponse(code = 500, message = "500에러") })
	public ResponseEntity<?> MyPageFundingList(@PathVariable int user_id) throws Exception {
		
		List<Map> list = fundingService.findAllByUserid(user_id);
		
		return new ResponseEntity<List<Map>>(list,HttpStatus.OK);
	}
	
	@PatchMapping("/detail/updateAmount")
	@ApiOperation(value = "reward의 남은 수량을 update한다.", notes = "reward의 남은 수량을 update한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "가져오기 성공"), @ApiResponse(code = 400, message = "400에러"),
		@ApiResponse(code = 409, message = "409에러"), @ApiResponse(code = 500, message = "500에러") })
	public ResponseEntity<?> updateAmount(@RequestBody UpdateAmountReq updateAmountReq) throws Exception {
		
		fundingService.updateAmount(updateAmountReq.getAmount(), updateAmountReq.getRewardId());
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/detail/insertFundingList")
	@ApiOperation(value = "FundingList data를 생성한다.", notes = "FundingList data를 생성한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "가져오기 성공"), @ApiResponse(code = 400, message = "400에러"),
		@ApiResponse(code = 409, message = "409에러"), @ApiResponse(code = 500, message = "500에러") })
	public ResponseEntity<?> insertFundingList(@RequestBody InsertFundingReq insertFundingReq) throws Exception {
		
		fundingService.InsertFundingList(insertFundingReq.getUserId(), insertFundingReq.getProjectId()
				, insertFundingReq.getRewardId(), insertFundingReq.getAmount());
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/detail/insertLike")
	@ApiOperation(value = "Like data를 생성하고, 해당 프로젝트의 좋아요를 1 증가시킨다.", notes = "Like data를 생성한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "가져오기 성공"), @ApiResponse(code = 400, message = "400에러"),
		@ApiResponse(code = 409, message = "409에러"), @ApiResponse(code = 500, message = "500에러") })
	public ResponseEntity<?> insertLike(@RequestBody LikeInsertReq likeInsertReq) throws Exception {
		
		fundingService.InsertLike(likeInsertReq.getProjectId(), likeInsertReq.getUserId());
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/detail/deleteLike")
	@ApiOperation(value = "Like data를 삭제하고, 해당 프로젝트의 좋아요를 1 감소시킨다.", notes = "Like data를 삭제한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "가져오기 성공"), @ApiResponse(code = 400, message = "400에러"),
		@ApiResponse(code = 409, message = "409에러"), @ApiResponse(code = 500, message = "500에러") })
	public ResponseEntity<?> deleteLike(@RequestBody LikeInsertReq likeInsertReq) throws Exception {
		
		fundingService.deleteLike(likeInsertReq.getProjectId(), likeInsertReq.getUserId());
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/detail/likeClickOrNot")
	@ApiOperation(value = "like를 눌렀는지 판단하기", notes = "like를 눌렀는지 판단하기")
	@ApiResponses({ @ApiResponse(code = 200, message = "가져오기 성공"), @ApiResponse(code = 400, message = "400에러"),
		@ApiResponse(code = 409, message = "409에러"), @ApiResponse(code = 500, message = "500에러") })
	public ResponseEntity<?> likeClickOrNot(@RequestBody LikeInsertReq likeInsertReq) throws Exception {
		
		Boolean check = fundingService.likeClickOrNot(likeInsertReq.getProjectId(), likeInsertReq.getUserId());
		
		return new ResponseEntity<Boolean>(check, HttpStatus.OK);
	}
	
	@GetMapping("/detail/UserLikeOfProject/{projectId}")
	@ApiOperation(value = "project에 대한 userId를 검색한다", notes = "project에 대한 userId를 검색한다")
	@ApiResponses({ @ApiResponse(code = 200, message = "가져오기 성공"), @ApiResponse(code = 400, message = "400에러"),
		@ApiResponse(code = 409, message = "409에러"), @ApiResponse(code = 500, message = "500에러") })
	public ResponseEntity<?> UserLikeOfProjet(@PathVariable int projectId) throws Exception {
		
		List<Integer> list = fundingService.likeListOfProject(projectId);
		
		return new ResponseEntity<List<Integer>>(list, HttpStatus.OK);
	}
}
