package com.farmding.api.response;

import java.util.List;

import com.farmding.db.entity.Images;
import com.farmding.db.entity.Project;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("fundingDetailRes")
public class FundingDetailRes {
	@ApiModelProperty(name = "프로젝트 데이터", example = "JSON...")
	private Project project;

	@ApiModelProperty(name = "이미지 더미", example = "JSON...")
	private List<Images> images;
}