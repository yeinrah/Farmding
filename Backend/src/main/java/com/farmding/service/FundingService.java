package com.farmding.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.farmding.db.entity.Project;
import com.farmding.repository.ProjectRepository;

@Service
public class FundingService {
	private ProjectRepository projectRepository;
	@Transactional
	public List<Project> ProjectList() throws Exception {
		return projectRepository.findAll();
	}
	
}
