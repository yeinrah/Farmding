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
@Table(name = "user")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private int userId;
	
	@Column(name = "nickname")
	private String nickname;
	
	@Column(name = "wallet_address")
	private String walletAddress;
	
	@Column(name = "phone_number")
	private String phoneNumber;
	
	@Column(name = "profile_image")
	private int profileImage;
	
	@Column(name = "address")
	private String address;
		
	@Column(name = "is_active")
	private boolean isActive;
	
	@Column(name = "user_pr")
	private String userPr;
	
	
}
