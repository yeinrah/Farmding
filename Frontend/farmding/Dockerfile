FROM nginx
EXPOSE 3000
WORKDIR /var/jenkins_home/workspace/Farmding_FE/Frontend/farmding

COPY ./build /usr/share/nginx/html
CMD ["nginx", "-g","daemon off;"]

