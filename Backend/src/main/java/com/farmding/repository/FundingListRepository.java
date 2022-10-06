package com.farmding.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.farmding.db.entity.FundingList;

@Repository
public interface FundingListRepository extends JpaRepository<FundingList, String> {
//	List<Like> findAll();
	@Query(value = "select * from fundinglist where user_id = ?1", nativeQuery = true)
	List<FundingList> findAllByUserId(int userId);
}
