package com.farmding.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.farmding.db.entity.Project;


public interface ProjectRepository extends JpaRepository<Project, Integer> {
	List<Project> findAll();
}
