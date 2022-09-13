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
@Table(name = "FUNDING")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Funding {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "funding_id")
	private int fundingId;
	
	@Column(name = "user_id")
	private int userId;
	
	@Column(name = "project_id")
	private int projectId;
	
	@Column(name = "funding_amount")
	private double fundingAmount;
	
	@Column(name = "funding_created_date")
	private String fundingCreatedDate;
	
	@Column(name = "funding_status")
	private String fundingStatus;
	
	@Column(name = "funding_transaction_hash")
	private String fundingTransactionHash;
	
	@Column(name = "funding_receiver_address")
	private String fundingReceiverAddress;
}
