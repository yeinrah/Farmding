FROM node:16.16.0 as build-stage
EXPOSE 3000
WORKDIR /var/jenkins_home/workspace/Farmding_FE/Frontend/farmding
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /var/jenkins_home/workspace/Farmding_FE/Frontend/farmding/build /usr/share/nginx/html
CMD ["nginx", "-g","daemon off;"]