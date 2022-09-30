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
@Table(name = "project")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Project {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "project_id")
	private int projectId;
	
	@Column(name = "project_title")
	private String projectTitle;
	
	@Column(name = "project_explanation")
	private String projectExplanation;
	
	@Column(name = "category")
	private int category;
	
	@Column(name = "project_created_date")
	private String projectCreatedDate;
	
	@Column(name = "project_end_date")
	private String projectEndDate;
	
	@Column(name = "farmer_name")
	private String farmerName;
	
	@Column(name = "farmer_wallet_address")
	private String farmerWalletAddress;
	
	@Column(name = "target_amount")
	private double targetAmount;

	@Column(name = "current_amount")
	private double currentAmount;
	
	@Column(name = "project_period")
	private int projectPeriod;
	
	@Column(name = "funding_status")
	private String fundingStatus;
	
	@Column(name = "like_amount")
	private int likeAmount;
	
	@Column(name = "funder_count")
	private int funderCount;

	
}
