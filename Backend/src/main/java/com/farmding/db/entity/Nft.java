package com.farmding.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "NFT")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Nft {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "nft_id")
	private int nftId;
	
	@Column(name = "funding_id")
	private int fundingId;
	
	@Column(name = "original_file_name")
	private String originalFileName;
	
	@Column(name = "file_path")
	private String filePath;
	
	@Column(name = "file_size")
	private long fileSize;
	
	@Column(name = "nft_address")
	private String nftAddress;
	
	@Column(name = "nft_name")
	private String nftName;
	
	@Column(name = "owner_wallet_address")
	private String ownerWalletAddress;
	
	@Column(name = "is_on_sale")
	private boolean isOnSale;
	
	@Column(name = "current_price")
	private double currentPrice;
	
	@Column(name = "expire_date")
	private String expireDate;
}