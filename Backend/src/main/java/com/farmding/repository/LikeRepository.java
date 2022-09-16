package com.farmding.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.farmding.db.entity.Like;

@Repository
public interface LikeRepository extends JpaRepository<Like, String> {
//	List<Like> findAll();
	
	@Query(value = "SELECT * FROM `like` where user_id=?1", nativeQuery = true)
	List<Like> findAllByUserId(int userId);
}
