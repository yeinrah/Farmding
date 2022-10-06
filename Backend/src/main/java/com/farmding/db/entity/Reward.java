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
@Table(name = "reward")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Reward {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "reward_id")
	private int rewardId;
	
	@Column(name = "project_id")
	private int projectId;
	
	@Column(name = "reward_name")
	private String rewardName;
	
	@Column(name = "ssf_price")
	private double ssfPrice;
	
	@Column(name = "amount")
	private int amount;
	
	@Column(name = "delivery_fee")
	private int deliveryFee;
	
	@Column(name = "delivery_date")
	private String deliveryDate;
}
