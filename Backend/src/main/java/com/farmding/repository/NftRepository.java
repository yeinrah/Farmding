package com.farmding.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.farmding.db.entity.Nft;
import com.farmding.db.entity.Project;

public interface NftRepository extends JpaRepository<Nft, String> {
	List<Nft> findAllByOwnerWalletAddress(String ownerWalletAddress);
	
	List<Nft> findAll();
	
	List<Nft> findAllByIsOnSale();
	
	Nft findOneByNftId(int nftId);
	@Modifying
	@Query(value = "update nft set current_price =?1 where nft_id = ?2", nativeQuery = true)
	void updateCurrentPrice(double currentPrice, int nftId);

	@Modifying
	@Query(value = "update nft set is_on_sale =?1 where nft_id = ?2", nativeQuery = true)
	void updateIsOnSale(int isOnSale, int nftId);
}
