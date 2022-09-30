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
@Table(name = "deals")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Deals {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "deal_id")
	private int dealId;
	
	@Column(name = "nft_id")
	private int nftId;
	
	@Column(name = "deals_address")
	private String dealsAddress;
	
	@Column(name = "deals_created_date")
	private String dealsCreatedDate;
	
	@Column(name = "deals_ended_date")
	private String dealsEndedDate;
	
	@Column(name = "deals_status")
	private boolean dealsStatus;
	
	@Column(name = "deals_token_address")
	private String dealsTokenAddress;
	
	@Column(name = "seller_wallet_address")
	private String sellerWalletAddress;
	
	@Column(name = "buyer_wallet_address")
	private String buyerWalletAddress;
	
}
