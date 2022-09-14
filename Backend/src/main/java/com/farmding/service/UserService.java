package com.farmding.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.farmding.api.request.UpdateAddressReq;
import com.farmding.api.request.UpdateImageReq;
import com.farmding.api.request.UpdatePhoneReq;
import com.farmding.api.request.UpdateProfileReq;
import com.farmding.api.request.UserRegisterReq;
import com.farmding.db.entity.User;
import com.farmding.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	// 닉네임 중복 검사
	@Transactional(readOnly = true)
	public void checkNicknameDuplication(UserRegisterReq userRegisterReq) {
		boolean nicknameDuplicate = userRepository.existsByNickname(userRegisterReq.getNickname());
		if (nicknameDuplicate) {
			throw new IllegalStateException("이미 존재하는 닉네임입니다.");
		}
	}

	// 지갑 주소 중복 검사
	@Transactional(readOnly = true)
	public void checkWalletAddressDuplication(UserRegisterReq userRegisterReq) {
		boolean walletAddressDuplicate = userRepository.existsByWalletAddress(userRegisterReq.getWalletAddress());
		if (walletAddressDuplicate) {
			throw new IllegalStateException("이미 존재하는 지갑주소입니다.");
		}
	}

	// 회원 등록
	@Transactional
	public User signup(UserRegisterReq userRegisterReq) throws Exception {
		User user = User.builder().nickname(userRegisterReq.getNickname())
				.walletAddress(userRegisterReq.getWalletAddress()).phoneNumber(userRegisterReq.getPhoneNumber())
				.address(userRegisterReq.getAddress()).zipCode(userRegisterReq.getZipCode()).isActive(true).build();
		return userRepository.save(user);

	}

	// 회원 정보 조회
	@Transactional
	public HashMap<String, Object> findUser(int id) throws Exception {
		User user = userRepository.findOneByUserId(id);
//			//내가 후원한 프로젝트
//			List<Project> project = ProjectRepository.findByUserId(id);
//			//내 NFT
//			List<Nft> nft = NftRepository.findByUserId(id);

		if (user == null) {
			throw new IllegalStateException("회원 정보 조회에 실패했습니다.");
		}
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("user", user);
//			result.put("project", project);
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
		user.setNickname(updateProfileReq.getNickname());
		user.setUserPr(updateProfileReq.getUserPr());
		return userRepository.save(user);
	}
	
	// 회원 탈퇴(회원 정보 상태 변경) 
	@Transactional
	public User updateUserState(Integer id) throws Exception {
		User user = userRepository.findOneByUserId(id);
		user.setActive(false);
		return userRepository.save(user);
	}

}
