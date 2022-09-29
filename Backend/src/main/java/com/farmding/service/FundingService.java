package com.farmding.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.farmding.db.entity.FundingList;
import com.farmding.db.entity.Images;
import com.farmding.db.entity.Project;
import com.farmding.db.entity.Reward;
import com.farmding.repository.FundingListRepository;
import com.farmding.repository.ImagesRepository;
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
	
	
	public FundingService(ProjectRepository projectRepository, FundingListRepository fundingListRepository,
			ImagesRepository imagesRepository, RewardRepository rewardRepository) {
		super();
		this.projectRepository = projectRepository;
		this.fundingListRepository = fundingListRepository;
		this.imagesRepository = imagesRepository;
		this.rewardRepository = rewardRepository;
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
	public List<FundingList> GetFundingList(int fundingListId) throws Exception {
		List<FundingList> list = fundingListRepository.findAllByUserId(fundingListId);
		return list;
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
