package com.farmding.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.farmding.db.entity.FundingList;
import com.farmding.db.entity.Images;
import com.farmding.db.entity.Like;
import com.farmding.db.entity.Project;
import com.farmding.db.entity.Reward;
import com.farmding.repository.FundingListRepository;
import com.farmding.repository.ImagesRepository;
import com.farmding.repository.LikeRepository;
import com.farmding.repository.ProjectRepository;
import com.farmding.repository.RewardRepository;

@Service
public class FundingService {
	@Autowired
	private ProjectRepository projectRepository;
	@Autowired
	private FundingListRepository fundingListRepository;
	@Autowired
	private ImagesRepository imagesRepository;
	@Autowired
	private RewardRepository rewardRepository;
	@Autowired
	private LikeRepository likeRepository;
	
	
	
	public FundingService(ProjectRepository projectRepository, FundingListRepository fundingListRepository,
			ImagesRepository imagesRepository, RewardRepository rewardRepository, LikeRepository likeRepository) {
		super();
		this.projectRepository = projectRepository;
		this.fundingListRepository = fundingListRepository;
		this.imagesRepository = imagesRepository;
		this.rewardRepository = rewardRepository;
		this.likeRepository = likeRepository;
	}
	@Transactional
	public List<Project> ProjectList() throws Exception {
		List<Project> list = projectRepository.findAll();
		return list;
	}
	@Transactional
	public List<Project> ProjectListTopEight() throws Exception {
		List<Project> list = projectRepository.findAllBestEight();
		return list;
	}
	
	@Transactional
	public FundingList InsertFundingList(int userId, int projectId, int rewardId, int amount) throws Exception {
		FundingList list = FundingList.builder().userId(userId).projectId(projectId).
				rewardId(rewardId).amount(amount).build();
		return fundingListRepository.save(list);
	}
	
	@Transactional
	public Like InsertLike(int projectId, int userId) throws Exception {
		Like like = Like.builder().userId(userId).projectId(projectId).build(); //예약어처리 필요함(완료)
		//기존 프로젝트의 좋아요 값 가져오기
		Project project = projectRepository.findOneByProjectId(projectId);
		int likeAmount = project.getLikeAmount();
		//프로젝트에 좋아요 1 추가하기
		projectRepository.plusOneLikeAmount(likeAmount+1, projectId);
		return likeRepository.save(like);
	}
	
	@Transactional
	public void deleteLike(int projectId, int userId) throws Exception {
		//기존 프로젝트의 좋아요 값 가져오기
		Project project = projectRepository.findOneByProjectId(projectId);
		int likeAmount = project.getLikeAmount();
		//프로젝트에 좋아요 1 감소하기
		List<Like> list = likeRepository.likeClickOrNot(projectId, userId);
		if(list.size() != 0) {
		likeRepository.delete(list.get(0));
		projectRepository.plusOneLikeAmount(likeAmount-1, projectId);
		}
	}
	
	@Transactional
	public boolean likeClickOrNot(int projectId, int userId) throws Exception {
		List<Like> list = likeRepository.likeClickOrNot(projectId, userId);
		if(list.isEmpty())
			return false;
		else 
			return true;
	}
	
	@Transactional
	public List<Integer> likeListOfProject(int projectId) throws Exception {
		List<Like> list = likeRepository.likeUserOfProject(projectId);
		List<Integer> UserIdList = new ArrayList<>();
		for(int i=0; i<list.size();i++) {
			UserIdList.add(list.get(i).getUserId());
		}
		return UserIdList;
	}
	
	@Transactional
	public List<Project> zzimProjectList(int userId) throws Exception {
		//기존 프로젝트의 좋아요 값 가져오기
		List<Like> list = likeRepository.findAllByUserId(userId);
		List<Project> zzimProjectList = new ArrayList<Project>();
		for(int i=0; i<list.size();i++) {
			int projectId = list.get(i).getProjectId();
			Project project = projectRepository.findOneByProjectId(projectId);
			zzimProjectList.add(project);
		}
		return  zzimProjectList;
	}
	
	@Transactional
	public List<Map> findAllByUserid(int userId) throws Exception {
		List<FundingList> list = fundingListRepository.findAllByUserId(userId);
		List<Map> mapList = new ArrayList<Map>();
		
		for(int i=0; i<list.size();i++) {
			Map<String, Object> map = new HashMap<String, Object>();
			//보내줘야 할 것 = 수량, 총 펀딩 금액(수량*ssfPrice+delivery_fee)
			// ,project_title, reward_name, delivery_fee, delivery_date
			int amount = list.get(i).getAmount();		//총 수량
			
			Project project = projectRepository.findOneByProjectId(list.get(i).getProjectId());
			String projectTitle = project.getProjectTitle();
			Reward reward = rewardRepository.findOneByRewardId(list.get(i).getRewardId());
			String rewardName = reward.getRewardName();
			double ssfPrice = reward.getSsfPrice();
			int deliveryFee = reward.getDeliveryFee();
			double allOfFundingFee = amount * ssfPrice + deliveryFee;		//총 펀딩 금액
			String deliveryDate = reward.getDeliveryDate();
			int projectId = project.getProjectId();
			map.put("amount", amount);
			map.put("allOfFundingFee", allOfFundingFee);
			map.put("projectTitle", projectTitle);
			map.put("rewardName", rewardName);
			map.put("deliveryFee", deliveryFee);
			map.put("deliveryDate", deliveryDate);
			map.put("projectId", projectId);
			mapList.add(map);
		}
		
		return mapList;
	}

//	@Transactional
//	public List<Project> getUserLikeProject(List<Like> likeData) throws Exception {
//		
//		List<Integer> idData = new ArrayList<>();
//		for(int i=0; i<likeData.size();i++) {
//			idData.add(likeData.get(i).getProjectId());
////			System.out.println("getProjectId==> "+likeData.get(i).getProjectId());
//		}
//		
//		List<Project> list = new ArrayList<Project>();
//		for(int i=0; i<idData.size();i++) {
//			list.add(projectRepository.findOneByProjectId(idData.get(i)));
//		}
//		
//		return list;
//	}
	
	@Transactional
	public Project FindOneByProjectId(int projectId) throws Exception {
		return projectRepository.findOneByProjectId(projectId);
	}
	
	@Transactional
	public List<Images> FindAllImageByProjectId(int projectId) throws Exception {
		return imagesRepository.findAllByProjectId(projectId);
	}
	
	@Transactional
	public List<Reward> findSsfReward(int projectId) throws Exception {
		return rewardRepository.findAllByProjectId(projectId);
	}
	
	@Transactional
	public void updateAmount(int amount, int rewardId) throws Exception {
		
		Reward reward = rewardRepository.findOneByRewardId(rewardId);
		int result = reward.getAmount() - amount;
		rewardRepository.updateAmount(result, rewardId);
		
	}

	
}
