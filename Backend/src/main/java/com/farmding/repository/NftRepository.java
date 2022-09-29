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
	
	@Query(value = "select count(*) from nft", nativeQuery = true)
	int CountNft();

	@Query(value = "select * from nft where is_on_sale = ?1", nativeQuery = true)
	List<Nft> findAllByIsOnSale(int isOnSale);
	
	Nft findOneByNftId(int nftId);
	@Modifying
	@Query(value = "update nft set current_price =?1 where nft_id = ?2", nativeQuery = true)
	void updateCurrentPrice(double currentPrice, int nftId);

	@Modifying
	@Query(value = "update nft set is_on_sale =?1 where nft_id = ?2", nativeQuery = true)
	void updateIsOnSale(int isOnSale, int nftId);
	
	@Modifying
	@Query(value = "update nft set owner_nickname = ?1, owner_wallet_address = ?2 where nft_id = ?3", nativeQuery = true)
	void updateOwnerOfNft(String ownerNickname, String ownerWalletAddress, int nftId);
}
