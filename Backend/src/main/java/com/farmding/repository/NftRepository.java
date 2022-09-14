package com.farmding.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.farmding.db.entity.Nft;

public interface NftRepository extends JpaRepository<Nft, String> {
	List<Nft> findAllByOwnerWalletAddress(String ownerWalletAddress);

}
