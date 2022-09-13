package com.farmding.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.farmding.db.entity.Project;
import com.farmding.repository.ProjectRepository;

@Service
public class FundingService {
	@Autowired
	private ProjectRepository projectRepository;
	
	@Transactional
	public List<Project> ProjectList() throws Exception {
		List<Project> list = projectRepository.findAll();
		return list;
	}
	
}
