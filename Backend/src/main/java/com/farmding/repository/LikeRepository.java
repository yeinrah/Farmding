package com.farmding.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.farmding.db.entity.Like;

@Repository
public interface LikeRepository extends JpaRepository<Like, String> {
	@Query(value = "select * from `like` where user_id = ?1", nativeQuery = true)
	List<Like> findAllByUserId(int userId);
	
	@Modifying
	@Query(value = "delete * from `like` where user_id = ?1", nativeQuery = true)
	int deleteAllByUserId(int userId);
	
	@Query(value = "select * from `like` where project_id = ?1 and user_id = ?2", nativeQuery = true)
	List<Like> likeClickOrNot(int projectId, int userId);
	
	@Query(value = "select * from `like` where project_id = ?1", nativeQuery = true)
	List<Like> likeUserOfProject(int projectId);
	
//	@Query(value = "insert into `like` (project_id, user_id) values (?1,?2)", nativeQuery = true)
//	List<Like> InsertIntoLike(int projectId, int userId);
}
