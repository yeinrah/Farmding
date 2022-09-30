FROM nginx:stable-alpine
EXPOSE 3000
WORKDIR /var/jenkins_home/workspace/Farmding_FE/Frontend/farmding

COPY /var/jenkins_home/workspace/Farmding_FE/Frontend/farmding/build /usr/share/nginx/html
CMD ["nginx", "-g","daemon off;"]