FROM java:8
WORKDIR /var/jenkins_home/workspace/S07P22A608/Backend
EXPOSE 8080
ARG JAR_FILE=build/libs/farmding-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
ENV TZ=Asia/Seoul
RUN apt-get install -y tzdata



