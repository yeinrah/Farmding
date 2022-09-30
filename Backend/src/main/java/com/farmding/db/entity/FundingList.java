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
@Table(name = "fundinglist")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class  FundingList{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "fundinglist_id")
	private int fundingListId;

	@Column(name = "user_id")
	private int userId;

	@Column(name = "project_id")
	private int projectId;

	@Column(name = "reward_id")
	private int rewardId;
	
	@Column(name = "amount")
	private int amount;
}
