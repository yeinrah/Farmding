package com.farmding.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.farmding.db.entity.Nft;
import com.farmding.db.entity.Project;

public interface NftRepository extends JpaRepository<Nft, String> {
	
	@Query(value = "select * from nft where owner_wallet_address=?1", nativeQuery = true)
	List<Nft> findAllByOwnerWalletAddress(String ownerWalletAddress);
	
	List<Nft> findAll();
	
	@Query(value = "select count(*) from nft", nativeQuery = true)
	int CountNft();

	@Query(value = "select * from nft where is_on_sale = ?1", nativeQuery = true)
	List<Nft> findAllByIsOnSale(int isOnSale);
	
	Nft findOneByCount(int count);
	@Modifying
	@Query(value = "update nft set current_price =?1 where count = ?2", nativeQuery = true)
	void updateCurrentPrice(double currentPrice, int count);

	@Modifying
	@Query(value = "update nft set is_on_sale =?1 where count = ?2", nativeQuery = true)
	void updateIsOnSale(int isOnSale, int count);
	
	@Modifying
	@Query(value = "update nft set owner_nickname = ?1, owner_wallet_address = ?2 where count = ?3", nativeQuery = true)
	void updateOwnerOfNft(String ownerNickname, String ownerWalletAddress, int count);
}
