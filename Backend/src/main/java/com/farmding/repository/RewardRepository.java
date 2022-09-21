package com.farmding.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.farmding.db.entity.Project;
import com.farmding.db.entity.Reward;

@Repository
public interface RewardRepository extends JpaRepository<Reward, String> {
	
	@Query(value = "select * from reward where project_id=?1", nativeQuery = true)
	List<Reward> findAllByProjectId(int projectId);
	
}
