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

	// 회원등록 시, 닉네임 중복 검사
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
					.address(userRegisterReq.getAddress()).isActive(true).build();
			return userRepository.save(userinfo);
		} else if (userRegisterReq.getWalletAddress().equals(user.getWalletAddress()) && user.isActive() == false) {
			user.setNickname(userRegisterReq.getNickname());
			user.setPhoneNumber(userRegisterReq.getPhoneNumber());
			user.setAddress(userRegisterReq.getAddress());
			user.setActive(true);
			return userRepository.save(user);
		} else if (userRegisterReq.getWalletAddress().equals(user.getWalletAddress()) && user.isActive() == true) {
			throw new IllegalStateException("이미 존재하는 계정입니다.");
		} else {
			User userinfo = User.builder().nickname(userRegisterReq.getNickname())
					.walletAddress(userRegisterReq.getWalletAddress()).phoneNumber(userRegisterReq.getPhoneNumber())
					.address(userRegisterReq.getAddress()).isActive(true).build();
			return userRepository.save(userinfo);
		}
	}

	// 회원 정보(펀딩프로젝트) 조회
	@Transactional(readOnly = true)
	public HashMap<String, Object> findUserFunding(String walletAddress) throws Exception {
		User user = userRepository.findOneByWalletAddress(walletAddress);
		// 내가 후원한 펀딩프로젝트
		List<Funding> funding = fundingRepository.findAllByUserId(user.getUserId());
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("user", user);
		result.put("funding", funding);
		return result;
	}

	// 회원 정보(NFT) 조회
	@Transactional(readOnly = true)
	public HashMap<String, Object> findUserNFT(String walletAddress) throws Exception {
		User user = userRepository.findOneByWalletAddress(walletAddress);
		// 내 NFT
		List<Nft> nft = nftRepository.findAllByOwnerWalletAddress(user.getWalletAddress());
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("user", user);
		result.put("nft", nft);
		return result;
	}

	// 회원 배송지 수정
	@Transactional
	public User updateAddress(String walletAddress, UpdateAddressReq updateAddressReq) throws Exception {
		User user = userRepository.findOneByWalletAddress(walletAddress);
		user.setAddress(updateAddressReq.getAddress());
		return userRepository.save(user);
	}

	// 회원 전화번호 수정
	@Transactional
	public User updatePhone(String walletAddress, UpdatePhoneReq updatePhoneReq) throws Exception {
		User user = userRepository.findOneByWalletAddress(walletAddress);
		user.setPhoneNumber(updatePhoneReq.getPhone());
		return userRepository.save(user);
	}

	// 회원 프로필 사진 수정
	@Transactional
	public User updateImage(String walletAddress, UpdateImageReq updateImageReq) throws Exception {
		User user = userRepository.findOneByWalletAddress(walletAddress);
		user.setProfileImage(updateImageReq.getProfileImage());
		return userRepository.save(user);
	}

	// 회원 프로필 정보(닉네임, 자기소개) 수정
	@Transactional
	public User updateProfile(UpdateProfileReq updateProfileReq) throws Exception {
		User user = userRepository.findOneByWalletAddress(updateProfileReq.getWalletAddress());
		if (userRepository.existsByNickname(user.getNickname())) {
			user.setNickname(updateProfileReq.getNickname());
			user.setUserPr(updateProfileReq.getUserPr());
			return userRepository.save(user);
		} else {
			throw new IllegalStateException("이미 존재하는 닉네임입니다.");
		}

	}

	// 회원 탈퇴(회원 정보 상태 변경)
	@Transactional
	public User updateUserState(String walletAddress) throws Exception {
		User user = userRepository.findOneByWalletAddress(walletAddress);
		user.setActive(false);
		return userRepository.save(user);
	}

	// 지갑주소로 회원 정보 조회
	@Transactional(readOnly = true)
	public boolean findUserByWA(String walletAddress) throws Exception {
		boolean checkwalletAddressDuplicate  = userRepository.existsByWalletAddress(walletAddress);
		if (checkwalletAddressDuplicate) {
			return true;
		}
		return false;
	}
	
//	// 닉네임으로 회원 정보 조회
//	@Transactional(readOnly = true)
//	public boolean findUserByNN(String nickname) throws Exception {
//		User user = userRepository.findOneByNickname(nickname);
//		if (user == null) {
//			return false;
//		}
//		return true;
//	}
	
	// Only 닉네임 중복 검사
	@Transactional(readOnly = true)
	public boolean onlyCheckNicknameDuplication(String nickname) {
		boolean checknicknameDuplicate = userRepository.existsByNickname(nickname);
		if (checknicknameDuplicate) {
			return true;
		}
		return false;
	}
}
