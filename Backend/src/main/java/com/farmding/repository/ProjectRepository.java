package com.farmding.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.farmding.db.entity.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, String> {
	List<Project> findAll();
	
	@Query(value = "select * from project where project_id=?1", nativeQuery = true)
	Project findOneByProjectId(int projectId);
	
	@Query(value = "SELECT * FROM project order by funder_count desc limit 8", nativeQuery = true)
	List<Project> findAllBestEight();
}
