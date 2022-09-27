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
    `reward_id` int NOT NULL,
	`funding_amount` double	NULL,
	`funding_transaction_hash` varchar(200) NULL
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
    `current_amount` double NOT NULL,
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
	`is_active` boolean	NOT NULL,
    `user_pr` varchar(200) NULL
);

CREATE TABLE `REWARD` (
	`reward_id`	int NOT NULL  AUTO_INCREMENT PRIMARY KEY,
	`project_id` int NOT NULL,
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

ALTER TABLE `FUNDING` ADD CONSTRAINT `FK_REWARD_TO_FUNDING_1` FOREIGN KEY (
	`reward_id`
)
REFERENCES `REWARD` (
	`reward_id`
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

ALTER TABLE `IMAGES` ADD CONSTRAINT `FK_PROJECT_TO_IMAGES_1` FOREIGN KEY (
	`project_id`
)
REFERENCES `PROJECT` (
	`project_id`
);


-- 1. 딸기
insert into project (project_title, project_explanation, 
category, project_created_date, 
project_end_date, farmer_name, farmer_wallet_address, target_amount,
 current_amount, project_period, 
 funding_status, like_amount, funder_count)
 value ("내년의 첫 딸기를 가장 먼저 만나보세요.", "과일의 왕, 딸기가 돌아왔다!! 싸피농장은 27년 간 딸기만을 고집해 온 딸기계의 베테랑입니다. 무농약 재배방식을 사용하여 재배한 싸피농장의 첫 유기농 딸기를 누구보다도 빠르게 만나보세요. 12월부터 1월까지는 딸기 제철입니다. 당일 수확 당일 배송! 평균 20brix의 고당도 딸기! 저희 딸기로는 딸기쥬스를 만들어 먹어도 맛있고, 스무디를 해먹어도 맛있습니다. 영양도 풍부하고 맛도 좋은 딸기 많이 사랑해주세요!", 
 0,"2022-09-01 00:00:00", "2022-11-30 23:59:59", "김싸피", "0x90E99269dD2aFf31b9a7fc737E2725dC52Ccc246", 10000, 7076, 46, "open", 47, 21);

-- 2. 귤
insert into project (project_title, project_explanation, 
category, project_created_date, 
project_end_date, farmer_name, farmer_wallet_address, target_amount,
 current_amount, project_period, 
 funding_status, like_amount, funder_count)
 value ("내년의 첫 귤을 가장 먼저 만나보세요.", "과일의 왕, 귤이 돌아왔다!! 싸피농장은 27년 간 귤만을 고집해 온 귤계의 베테랑입니다. 무농약 재배방식을 사용하여 재배한 싸피농장의 첫 유기농 귤을 누구보다도 빠르게 만나보세요. 12월부터 1월까지는 귤 제철입니다. 당일 수확 당일 배송! 평균 20brix의 고당도 귤! 저희 귤로는 귤쥬스를 만들어 먹어도 맛있고, 스무디를 해먹어도 맛있습니다. 영양도 풍부하고 맛도 좋은 귤 많이 사랑해주세요!", 
 1,"2022-10-27 00:00:00", "2022-12-28 23:59:59", "김팜딩", "0x90E99269dD2aFf31b9a7fc737E2725dC52Ccc246", 10000, 7076, 60, "open", 47, 21);


-- 3. 복숭아
insert into project (project_title, project_explanation, 
category, project_created_date, 
project_end_date, farmer_name, farmer_wallet_address, target_amount,
 current_amount, project_period, 
 funding_status, like_amount, funder_count)
 value ("내년의 첫 복숭아를 가장 먼저 만나보세요.", "과일의 왕, 복숭아가 돌아왔다!! 싸피농장은 27년 간 복숭아만을 고집해 온 복숭아계의 베테랑입니다. 무농약 재배방식을 사용하여 재배한 싸피농장의 첫 유기농 복숭아를 누구보다도 빠르게 만나보세요. 12월부터 1월까지는 복숭아 제철입니다. 당일 수확 당일 배송! 평균 20brix의 고당도 복숭아! 저희 복숭아로는 복숭아쥬스를 만들어 먹어도 맛있고, 스무디를 해먹어도 맛있습니다. 영양도 풍부하고 맛도 좋은 복숭아 많이 사랑해주세요!", 
 2,"2022-09-27 00:00:00", "2022-11-11 23:59:59", "김영진", "0x90E99269dD2aFf31b9a7fc737E2725dC52Ccc246", 10000, 7076, 46, "open", 47, 21);


-- 4. 사과
insert into project (project_title, project_explanation, 
category, project_created_date, 
project_end_date, farmer_name, farmer_wallet_address, target_amount,
 current_amount, project_period, 
 funding_status, like_amount, funder_count)
 value ("내년의 첫 사과를 가장 먼저 만나보세요.", "과일의 왕, 사과가 돌아왔다!! 싸피농장은 27년 간 사과만을 고집해 온 사과계의 베테랑입니다. 무농약 재배방식을 사용하여 재배한 싸피농장의 첫 유기농 사과를 누구보다도 빠르게 만나보세요. 12월부터 1월까지는 사과 제철입니다. 당일 수확 당일 배송! 평균 20brix의 고당도 사과! 저희 사과로는 사과쥬스를 만들어 먹어도 맛있고, 스무디를 해먹어도 맛있습니다. 영양도 풍부하고 맛도 좋은 사과 많이 사랑해주세요!", 
 3,"2022-03-12 00:00:00", "2022-05-23 23:59:59", "김정서", "0x90E99269dD2aFf31b9a7fc737E2725dC52Ccc246", 10000, 7076, 46, "open", 47, 21);


-- 5. 블루베리
insert into project (project_title, project_explanation, 
category, project_created_date, 
project_end_date, farmer_name, farmer_wallet_address, target_amount,
 current_amount, project_period, 
 funding_status, like_amount, funder_count)
 value ("내년의 첫 블루베리를 가장 먼저 만나보세요.", "과일의 왕, 블루베리가 돌아왔다!! 싸피농장은 27년 간 블루베리만을 고집해 온 블루베리계의 베테랑입니다. 무농약 재배방식을 사용하여 재배한 싸피농장의 첫 유기농 블루베리를 누구보다도 빠르게 만나보세요. 12월부터 1월까지는 블루베리 제철입니다. 당일 수확 당일 배송! 평균 20brix의 고당도 블루베리! 저희 블루베리로는 블루베리쥬스를 만들어 먹어도 맛있고, 스무디를 해먹어도 맛있습니다. 영양도 풍부하고 맛도 좋은 블루베리 많이 사랑해주세요!", 
 4,"2022-06-27 00:00:00", "2022-08-15 23:59:59", "고은민", "0x90E99269dD2aFf31b9a7fc737E2725dC52Ccc246", 10000, 7076, 46, "open", 47, 21);


-- 6. 바나나
insert into project (project_title, project_explanation, 
category, project_created_date, 
project_end_date, farmer_name, farmer_wallet_address, target_amount,
 current_amount, project_period, 
 funding_status, like_amount, funder_count)
 value ("내년의 첫 바나나를 가장 먼저 만나보세요.", "과일의 왕, 바나나가 돌아왔다!! 싸피농장은 27년 간 바나나만을 고집해 온 바나나계의 베테랑입니다. 무농약 재배방식을 사용하여 재배한 싸피농장의 첫 유기농 바나나를 누구보다도 빠르게 만나보세요. 12월부터 1월까지는 바나나 제철입니다. 당일 수확 당일 배송! 평균 20brix의 고당도 바나나! 저희 바나나로는 바나나쥬스를 만들어 먹어도 맛있고, 스무디를 해먹어도 맛있습니다. 영양도 풍부하고 맛도 좋은 바나나 많이 사랑해주세요!", 
 5,"2022-08-27 00:00:00", "2022-09-30 23:59:59", "최싸피", "0x90E99269dD2aFf31b9a7fc737E2725dC52Ccc246", 10000, 7076, 46, "open", 47, 21);


-- 7. 체리
insert into project (project_title, project_explanation, 
category, project_created_date, 
project_end_date, farmer_name, farmer_wallet_address, target_amount,
 current_amount, project_period, 
 funding_status, like_amount, funder_count)
 value ("내년의 첫 체리를 가장 먼저 만나보세요.", "과일의 왕, 체리가 돌아왔다!! 싸피농장은 27년 간 체리만을 고집해 온 체리계의 베테랑입니다. 무농약 재배방식을 사용하여 재배한 싸피농장의 첫 유기농 체리를 누구보다도 빠르게 만나보세요. 12월부터 1월까지는 체리 제철입니다. 당일 수확 당일 배송! 평균 20brix의 고당도 체리! 저희 체리로는 체리쥬스를 만들어 먹어도 맛있고, 스무디를 해먹어도 맛있습니다. 영양도 풍부하고 맛도 좋은 체리 많이 사랑해주세요!", 
 6,"2022-06-27 00:00:00", "2022-08-11 23:59:59", "송상훈", "0x90E99269dD2aFf31b9a7fc737E2725dC52Ccc246", 10000, 7076, 46, "open", 47, 21);


-- 8. 포도
insert into project (project_title, project_explanation, 
category, project_created_date, 
project_end_date, farmer_name, farmer_wallet_address, target_amount,
 current_amount, project_period, 
 funding_status, like_amount, funder_count)
 value ("내년의 첫 포도를 가장 먼저 만나보세요.", "과일의 왕, 포도가 돌아왔다!! 싸피농장은 27년 간 포도만을 고집해 온 포도계의 베테랑입니다. 무농약 재배방식을 사용하여 재배한 싸피농장의 첫 유기농 포도를 누구보다도 빠르게 만나보세요. 12월부터 1월까지는 포도 제철입니다. 당일 수확 당일 배송! 평균 20brix의 고당도 포도! 저희 포도로는 포도쥬스를 만들어 먹어도 맛있고, 스무디를 해먹어도 맛있습니다. 영양도 풍부하고 맛도 좋은 포도 많이 사랑해주세요!", 
 7,"2022-09-27 00:00:00", "2022-11-23 23:59:59", "나예인", "0x90E99269dD2aFf31b9a7fc737E2725dC52Ccc246", 10000, 7076, 46, "open", 47, 21);


-- 9. 오렌지
insert into project (project_title, project_explanation, 
category, project_created_date, 
project_end_date, farmer_name, farmer_wallet_address, target_amount,
 current_amount, project_period, 
 funding_status, like_amount, funder_count)
 value ("내년의 첫 오렌지를 가장 먼저 만나보세요.", "과일의 왕, 오렌지가 돌아왔다!! 싸피농장은 27년 간 오렌지만을 고집해 온 오렌지계의 베테랑입니다. 무농약 재배방식을 사용하여 재배한 싸피농장의 첫 유기농 오렌지를 누구보다도 빠르게 만나보세요. 12월부터 1월까지는 오렌지 제철입니다. 당일 수확 당일 배송! 평균 20brix의 고당도 오렌지! 저희 오렌지로는 오렌지쥬스를 만들어 먹어도 맛있고, 스무디를 해먹어도 맛있습니다. 영양도 풍부하고 맛도 좋은 오렌지 많이 사랑해주세요!", 
 8,"2022-05-27 00:00:00", "2022-07-20 23:59:59", "이싸피", "0x90E99269dD2aFf31b9a7fc737E2725dC52Ccc246", 10000, 7076, 46, "open", 47, 21);


-- 10. 수박
insert into project (project_title, project_explanation, 
category, project_created_date, 
project_end_date, farmer_name, farmer_wallet_address, target_amount,
 current_amount, project_period, 
 funding_status, like_amount, funder_count)
 value ("내년의 첫 수박을 가장 먼저 만나보세요.", "과일의 왕, 수박이 돌아왔다!! 싸피농장은 27년 간 수박만을 고집해 온 수박계의 베테랑입니다. 무농약 재배방식을 사용하여 재배한 싸피농장의 첫 유기농 수박을 누구보다도 빠르게 만나보세요. 12월부터 1월까지는 수박 제철입니다. 당일 수확 당일 배송! 평균 20brix의 고당도 수박! 저희 수박로는 수박쥬스를 만들어 먹어도 맛있고, 스무디를 해먹어도 맛있습니다. 영양도 풍부하고 맛도 좋은 수박 많이 사랑해주세요!", 
 9,"2022-05-27 00:00:00", "2022-07-31 23:59:59", "박싸피", "0x90E99269dD2aFf31b9a7fc737E2725dC52Ccc246", 10000, 7076, 46, "open", 47, 21);

select * from user;
select * from project;