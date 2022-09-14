package com.farmding.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.farmding.db.entity.Images;
import com.farmding.db.entity.Like;
import com.farmding.db.entity.Project;
import com.farmding.repository.ImagesRepository;
import com.farmding.repository.LikeRepository;
import com.farmding.repository.ProjectRepository;

@Service
public class FundingService {
	@Autowired
	private ProjectRepository projectRepository;
	@Autowired
	private LikeRepository likeRepository;
	@Autowired
	private ImagesRepository imagesRepository;
	
	public FundingService(ProjectRepository projectRepository, LikeRepository likeRepository,
			ImagesRepository imagesRepository) {
		super();
		this.projectRepository = projectRepository;
		this.likeRepository = likeRepository;
		this.imagesRepository = imagesRepository;
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
	public List<Like> likeFunding(int userId) throws Exception {
		List<Like> list = likeRepository.findAllByUserId(userId);
		return list;
	}

	@Transactional
	public List<Project> getUserLikeProject(List<Like> likeData) throws Exception {
		
		List<Integer> idData = new ArrayList<>();
		for(int i=0; i<likeData.size();i++) {
			idData.add(likeData.get(i).getProjectId());
//			System.out.println("getProjectId==> "+likeData.get(i).getProjectId());
		}
		
		List<Project> list = new ArrayList<Project>();
		for(int i=0; i<idData.size();i++) {
			list.add(projectRepository.findOneByProjectId(idData.get(i)));
		}
		
		return list;
	}
	
	@Transactional
	public Project FindOneByProjectId(int projectId) throws Exception {
		return projectRepository.findOneByProjectId(projectId);
	}
	
	@Transactional
	public List<Images> FindAllImageByProjectId(int projectId) throws Exception {
		return imagesRepository.findAllByProjectId(projectId);
	}

	
}
