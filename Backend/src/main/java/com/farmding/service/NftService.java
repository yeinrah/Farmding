package com.farmding.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.farmding.api.request.NftAddReq;
import com.farmding.db.entity.Nft;
import com.farmding.repository.NftRepository;

@Service
public class NftService {
	@Autowired
	private NftRepository nftRepository;

	public NftService(NftRepository nftRepository) {
		super();
		this.nftRepository = nftRepository;
	}

	@Transactional
	public List<Nft> NftList() throws Exception {
		List<Nft> list = nftRepository.findAll();
		return list;
	}

	// NFT 등록
	@Transactional
	public Nft addNft(NftAddReq nftAddReq) throws Exception {
		Nft nft = Nft.builder().fundingId(nftAddReq.getFundingId()).
				nftAddress(nftAddReq.getNftAddress()).ownerWalletAddress(nftAddReq.getOwnerWalletAddress()).
				isOnSale(false).currentPrice(nftAddReq.getCurrentPrice()).ownerNickname(nftAddReq.getOwnerNickname()).build();
		return nftRepository.save(nft);

	}
	
	@Transactional
	public void updateCurrentPrice(double currentPrice, int nftId) throws Exception {
		nftRepository.updateCurrentPrice(currentPrice, nftId);
		
	}
	
	@Transactional
	public List<Nft> findAllByIsOnSale(int isOnSale) throws Exception {
		return nftRepository.findAllByIsOnSale(isOnSale);
		
	}
	
	@Transactional
	public void updateIsOnSale(int nftId) throws Exception {
		Nft id = nftRepository.findOneByNftId(nftId);
//		System.out.println("가격이 제대로 들어왔나요 ? = "+id.getCurrentPrice());
//		System.out.println("불린값이 제대로 들어왔나요 ? = "+id.isOnSale());
		if(id.isOnSale()) {
			nftRepository.updateIsOnSale(0, nftId);
		}else {
			nftRepository.updateIsOnSale(1, nftId);
		}
		
	}
	
	@Transactional
	public void updateOwnerOfNft(String ownerNickname, String ownerWalletAddress, int nftId) throws Exception {
		nftRepository.updateOwnerOfNft(ownerNickname, ownerWalletAddress, nftId);
	}
}
