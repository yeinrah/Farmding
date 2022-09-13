package com.farmding.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.farmding.db.entity.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, String> {
	List<Project> findAll();
}
