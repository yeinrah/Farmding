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
@Table(name = "images")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Images {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "image_id")
	private int imageId;

	@Column(name = "project_id")
	private int projectId;

	@Column(name = "project_file_name")
	private String projectFileName;
	
	@Column(name = "project_file_path")
	private String projectFilePath;
	
	@Column(name = "is_main", nullable = false)
	private Boolean isMain;
}
