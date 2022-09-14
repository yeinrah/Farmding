DROP DATABASE IF EXISTS `farmding`;

CREATE DATABASE IF NOT EXISTS `farmding` collate utf8mb4_general_ci;
USE `farmding`;

CREATE TABLE `NFT` (
	`nft_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `funding_id` int NOT NULL,
    `original_file_name` varchar(200) NOT NULL,
    `file_path` varchar(200) NOT NULL,
    `file_size` bigint NULL,
    `nft_address` varchar(200) NOT NULL,
    `nft_name` varchar(200) NOT NULL,
    `owner_wallet_address` varchar(200) NOT NULL,
    `is_on_sale` boolean NOT NULL,
    `current_price` double NOT NULL,
    `expire_date` datetime NOT NULL
);

CREATE TABLE `DEALS` (
	`deal_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`nft_id` int NOT NULL,
	`deals_address`	varchar(200) NOT NULL,
	`deals_created_date` datetime NOT NULL,
	`deals_ended_date`	datetime NOT NULL,
	`deals_status`	boolean	NOT NULL,
	`deals_token_address`	varchar(200) NOT NULL,
	`seller_wallet_address`	varchar(200) NOT NULL,
	`buyer_wallet_address`	varchar(200) NOT NULL
);

CREATE TABLE `FUNDING` (
	`funding_id` int AUTO_INCREMENT	NOT NULL PRIMARY KEY,
	`user_id` int NOT NULL,
	`project_id` int NOT NULL,
	`funding_amount` double	NULL,
	`funding_created_date` datetime	NULL,
	`funding_status` varchar(20) NULL,
	`funding_transaction_hash` varchar(200) NULL,
	`funding_receiver_address` varchar(200)	NULL
);

CREATE TABLE `PROJECT` (
	`project_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`project_title` varchar(100) NOT NULL,
	`project_explanation` text NULL,
	`category` int NOT NULL,
	`project_created_date` datetime NOT NULL,
	`project_end_date` datetime NOT NULL,
	`farmer_name` varchar(10) NOT NULL,
	`farmer_wallet_address`	varchar(200) NOT NULL,
	`target_amount` double NOT NULL,
	`project_period` int NOT NULL,
	`funding_status` varchar(20) NOT NULL,
	`like_amount` int NOT NULL,
	`funder_count` int NOT NULL
);

CREATE TABLE `LIKE` (
	`like_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`user_id` int NOT NULL,
	`project_id` int NOT NULL
);

CREATE TABLE `USER` (
	`user_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`nickname` varchar(50) NOT NULL,
	`wallet_address` varchar(200) NOT NULL,
	`phone_number` varchar(13) NOT NULL,
	`profile_image` int	NOT NULL,
	`address` varchar(100) NOT NULL,
	`zip_code` varchar(5) NOT NULL,
	`is_active` boolean	NOT NULL,
    `user_pr` varchar(200) NULL
);

CREATE TABLE `REWARD` (
	`reward_id`	int NOT NULL  AUTO_INCREMENT PRIMARY KEY,
	`project_id` int NOT NULL,
	`user_id` int NOT NULL,
	`reward_name` varchar(50) NULL,
	`ssf_price` double NULL,
	`amount` int NULL,
	`delivery_fee` int NULL,
	`delivery_date`	datetime NOT NULL
);

CREATE TABLE `IMAGES` (
	`image_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`project_id` int NOT NULL,
	`project_file_name` varchar(200) NOT NULL,
	`project_file_path` varchar(200) NOT NULL,
	`is_main` boolean NULL
);

ALTER TABLE `NFT` ADD CONSTRAINT `FK_FUNDING_TO_NFT_1` FOREIGN KEY (
	`funding_id`
)
REFERENCES `FUNDING` (
	`funding_id`
);

ALTER TABLE `DEALS` ADD CONSTRAINT `FK_NFT_TO_DEALS_1` FOREIGN KEY (
	`nft_id`
)
REFERENCES `NFT` (
	`nft_id`
);

ALTER TABLE `FUNDING` ADD CONSTRAINT `FK_USER_TO_FUNDING_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `USER` (
	`user_id`
);

ALTER TABLE `FUNDING` ADD CONSTRAINT `FK_PROJECT_TO_FUNDING_1` FOREIGN KEY (
	`project_id`
)
REFERENCES `PROJECT` (
	`project_id`
);

ALTER TABLE `LIKE` ADD CONSTRAINT `FK_USER_TO_LIKE_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `USER` (
	`user_id`
);

ALTER TABLE `LIKE` ADD CONSTRAINT `FK_PROJECT_TO_LIKE_1` FOREIGN KEY (
	`project_id`
)
REFERENCES `PROJECT` (
	`project_id`
);

ALTER TABLE `REWARD` ADD CONSTRAINT `FK_PROJECT_TO_REWARD_1` FOREIGN KEY (
	`project_id`
)
REFERENCES `PROJECT` (
	`project_id`
);

ALTER TABLE `REWARD` ADD CONSTRAINT `FK_USER_TO_REWARD_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `USER` (
	`user_id`
);

ALTER TABLE `IMAGES` ADD CONSTRAINT `FK_PROJECT_TO_IMAGES_1` FOREIGN KEY (
	`project_id`
)
REFERENCES `PROJECT` (
	`project_id`
);