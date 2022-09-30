FROM nginx
EXPOSE 3000
RUN mkdir /app
WORKDIR /app
RUN mkdir ./build
ADD ./build ./build

COPY ./ /usr/share/nginx/html
CMD ["nginx", "-g","daemon off;"]
