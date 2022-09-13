package com.farmding.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.farmding.db.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	User findOneByUserId(int id);

}
