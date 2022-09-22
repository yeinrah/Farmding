package com.farmding.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.farmding.api.request.UpdateAddressReq;
import com.farmding.api.request.UpdateImageReq;
import com.farmding.api.request.UpdatePhoneReq;
import com.farmding.api.request.UpdateProfileReq;
import com.farmding.api.request.UserRegisterReq;
import com.farmding.db.entity.Funding;
import com.farmding.db.entity.Nft;
import com.farmding.db.entity.User;
import com.farmding.repository.FundingRepository;
import com.farmding.repository.NftRepository;
import com.farmding.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private FundingRepository fundingRepository;

	@Autowired
	private NftRepository nftRepository;

	public UserService(UserRepository userRepository, FundingRepository fundingRepository,
			NftRepository nftRepository) {
		super();
		this.userRepository = userRepository;
		this.fundingRepository = fundingRepository;
		this.nftRepository = nftRepository;
	}

	// 닉네임 중복 검사
	@Transactional(readOnly = true)
	public void checkNicknameDuplication(UserRegisterReq userRegisterReq) {
		boolean nicknameDuplicate = userRepository.existsByNickname(userRegisterReq.getNickname());
		if (nicknameDuplicate) {
			throw new IllegalStateException("이미 존재하는 닉네임입니다.");
		}
	}

	// 회원 등록
	@Transactional
	public User signup(UserRegisterReq userRegisterReq) throws Exception {
		User user = userRepository.findOneByWalletAddress(userRegisterReq.getWalletAddress());
		if (user == null) {
			User userinfo = User.builder().nickname(userRegisterReq.getNickname())
					.walletAddress(userRegisterReq.getWalletAddress()).phoneNumber(userRegisterReq.getPhoneNumber())
					.address(userRegisterReq.getAddress()).zipCode(userRegisterReq.getZipCode()).isActive(true).build();
			return userRepository.save(userinfo);
		} else if (userRegisterReq.getWalletAddress().equals(user.getWalletAddress()) && user.isActive() == false) {
			user.setNickname(userRegisterReq.getNickname());
			user.setPhoneNumber(userRegisterReq.getPhoneNumber());
			user.setAddress(userRegisterReq.getAddress());
			user.setZipCode(userRegisterReq.getZipCode());
			user.setActive(true);
			return userRepository.save(user);
		} else if (userRegisterReq.getWalletAddress().equals(user.getWalletAddress()) && user.isActive() == true) {
			throw new IllegalStateException("이미 존재하는 계정입니다.");
		} else {
			User userinfo = User.builder().nickname(userRegisterReq.getNickname())
					.walletAddress(userRegisterReq.getWalletAddress()).phoneNumber(userRegisterReq.getPhoneNumber())
					.address(userRegisterReq.getAddress()).zipCode(userRegisterReq.getZipCode()).isActive(true).build();
			return userRepository.save(userinfo);
		}
	}

	// 회원 정보(펀딩프로젝트) 조회
	@Transactional
	public HashMap<String, Object> findUserFunding(int id) throws Exception {
		User user = userRepository.findOneByUserId(id);
		// 내가 후원한 펀딩프로젝트
		List<Funding> funding = fundingRepository.findAllByUserId(id);
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("user", user);
		result.put("funding", funding);
		return result;
	}

	// 회원 정보(NFT) 조회
	@Transactional
	public HashMap<String, Object> findUserNFT(int id) throws Exception {
		User user = userRepository.findOneByUserId(id);
		// 내 NFT
		List<Nft> nft = nftRepository.findAllByOwnerWalletAddress(user.getWalletAddress());
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("user", user);
		result.put("nft", nft);
		return result;
	}

	// 회원 배송지 수정
	@Transactional
	public User updateAddress(int id, UpdateAddressReq updateAddressReq) throws Exception {
		User user = userRepository.findOneByUserId(id);
		user.setAddress(updateAddressReq.getAddress());
		return userRepository.save(user);
	}

	// 회원 전화번호 수정
	@Transactional
	public User updatePhone(int id, UpdatePhoneReq updatePhoneReq) throws Exception {
		User user = userRepository.findOneByUserId(id);
		user.setPhoneNumber(updatePhoneReq.getPhone());
		return userRepository.save(user);
	}

	// 회원 프로필 사진 수정
	@Transactional
	public User updateImage(Integer id, UpdateImageReq updateImageReq) throws Exception {
		User user = userRepository.findOneByUserId(id);
		user.setProfileImage(updateImageReq.getProfileImage());
		return userRepository.save(user);
	}

	// 회원 프로필 정보(닉네임, 자기소개) 수정
	@Transactional
	public User updateProfile(Integer id, UpdateProfileReq updateProfileReq) throws Exception {
		User user = userRepository.findOneByUserId(id);
		if (userRepository.existsByNickname(user.getNickname()) == false) {
			user.setNickname(updateProfileReq.getNickname());
			user.setUserPr(updateProfileReq.getUserPr());
			return userRepository.save(user);
		} else {
			throw new IllegalStateException("이미 존재하는 닉네임입니다.");
		}

	}

	// 회원 탈퇴(회원 정보 상태 변경)
	@Transactional
	public User updateUserState(Integer id) throws Exception {
		User user = userRepository.findOneByUserId(id);
		user.setActive(false);
		return userRepository.save(user);
	}

}