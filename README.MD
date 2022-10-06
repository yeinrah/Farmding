# Farmding
 - 농산물 크라우드 펀딩과 NFT를 결합한 웹 서비스

# 팀원을 소개합니다!
        고은민           김영진           김정서           나예인           송상훈

![5FEAABBC-CA96-472A-B551-44C86809325E](https://user-images.githubusercontent.com/63994962/194329474-58fedb22-42ce-4209-b217-3603d07673f5.jpg)![kimjeongseo jpg](https://user-images.githubusercontent.com/63994962/187566676-4b167d52-01b5-4845-8096-9d26ebe5cd9b.png) ![김영진 jpg](https://user-images.githubusercontent.com/63994962/187566679-0fbab3f4-627e-4483-9a06-912b6a29f5d0.jpg) ![jenkins-logo](https://user-images.githubusercontent.com/63994962/187566675-a38857c0-faf1-4d28-8dd0-363c73f10c58.png) ![송상훈](https://user-images.githubusercontent.com/63994962/187566682-5afcdd4b-5b77-44f3-97d0-d1e97c76ea19.jpg) 



# 팀원 역할
고은민 : Frontend,BlockChain <br>
김영진 : Backend,BlockChain<br>
김정서 : Frontend,BlockChain <br>
나예인 : Backend, Server, CI/CD <br>
송상훈 : 팀장, Backend <br>

<hr>

## 프로젝트 기간 : 2022.08.22 ~ 2022.10.7

## Farmding 로고
![logo](https://user-images.githubusercontent.com/24909625/194270436-ed98e5cd-c9b0-4ea6-8bb7-6a254017251e.png)
<hr>

## 개발환경

- [ ]  협업툴
- Notion
- Jira
- Mattermost
- GitLab
- Webex
----------------------------- 
- React 18.2.0
- React Router 6.3.0
- Recoil 0.7.5
- Material UI 5.10.3
- Axios 0.27.2
- Typescript 4.8.2
- sweetalert2 11.4.37

---

- [ ]  Backend
- openjdk 1.8.0_192
- Java Zulu 8.33.0.1
- eclipse 4.16.0 (2020-06)
- Spring Boot 2.7.1
- Spring Data JPA
- Spring Security 5.6.6
- MySQL 5.7.37

---

- [ ]  CI/CD
- Docker version 20.10.18, build b40c2f6
- NGINX
- AWS EC2
- Jenkins : jenkins/jenkins:lts (Docker image)

---

# Farmding의 모토
농가와 소비자가 상생하는 크라우드 펀딩

<hr>

# 서비스 설명
농산물 직거래를 크라우드 펀딩으로 수행함과 동시에 NFT 발급, 거래를 가능하게 해줍니다.

# 주요 기능
- 크라우드 펀딩을 통한 농산물 직거래
- 펀딩한 유저에게 NFT 발급
- NFT를 통한 커뮤니티 형성
- NFT구매, 판매가 가능한 마켓 운영
<hr>

# 시스템 아키텍쳐
![farmding_architecture](https://user-images.githubusercontent.com/63994962/194330471-5e510426-bd38-464b-ae0b-328518388c12.png)

<hr>

# CI/CD 구축 및 SSL 인증서 적용
프론트엔드 React.js는 Nginx와 함께 docker를 사용하여 빌드 및 배포하였고, 백엔드 Spring boot 또한 docker container를 통해 배포하였습니다. 
<br>
Nginx와 letsencrypt를 이용하여 SSL 인증서를 적용하고, 프론트엔드는 https의 기본값 443을 통해 분기, 백엔드는 /api의 경로로 프록시를 걸어주었습니다.

# 기술 특이점
- SSAFY 블록체인 네트워크
- Web3
<hr>

# 요구사항 정의서
![요구사항정의서](https://user-images.githubusercontent.com/24909625/194271765-e88b192a-3c46-45bc-ad34-17a11a12ef68.PNG)
<hr>

# Git 컨벤션

```
FEAT:    새로운 기능을 추가할 경우
FIX:     버그를 고친 경우
STYLE:   코드 포맷 변경, 간단한 수정, 코드 변경이 없는 경우
REFATOR: 프로덕션 코드 리팩토링
DOCS:    문서를 수정한 경우(ex> Swagger)
Rename:  파일 혹은 폴더명 수정 및 이동
Remove:  파일 삭제
```

<hr>

# Git Flow 브랜치 전략
- 사용 브랜치
master - 배포
devleop - 개발
feature - 기능

- 진행 방식
feature의 기능이 완성되면 develop에 merge
배포 준비가 완료되면 develop 브랜치를 master에 merge

<hr>


<hr>

# ER Diagram
![ERD](https://user-images.githubusercontent.com/63994962/194330689-d4938b16-e96d-41c1-a76b-c340184438ac.png)

<hr>

# EC2 포트 정리
|443 | HTTPS|
|-|-|
|80 | HTTP -> HTTPS로 Redirect|
|3306 | MySQL|
|8080 | Spring Boot |
|3000 | React |
|9090 | Jenkins|

<hr>

# 개발 후 회고
<hr>

송상훈 : 소중한 팀원들과 함께 프로젝트를 진행할 수 있어서 좋았습니다. 으쌰으쌰 하는 분위기 덕분에 프로젝트를 즐길 수 있었습니다.<br>

김영진 : 새로운 기술을 배우다 보니 어려운 점도 많았지만, 즐거운 시간이었습니다. 현업에서도 새로운 기술 많이 배워서 쓸 텐데, 예행연습 한 느낌이에요!<br>

나예인 : 목표로 했던 젠킨스 도입도 성공했고 새로운 기술에 도전하면서 많이 배운 것 같아 만족스럽습니다. 수고하셨습니다! <br>

김정서 : NFT라는 새로운 기술을 접하며 재밌게 개발할 수 있었습니다.<br>

고은민 : 블록체인 기술에 흥미를 갖게 된 계기였습니다! 새로운 도전은 힘들지만 재밌는 것 같습니다! <br>
