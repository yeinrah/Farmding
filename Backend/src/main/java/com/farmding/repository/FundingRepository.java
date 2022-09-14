package com.farmding.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.farmding.db.entity.Funding;

public interface FundingRepository extends JpaRepository<Funding, String> {
	List<Funding> findAllByUserId(int userId);

}
