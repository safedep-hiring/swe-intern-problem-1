FROM gradle:8.5-jdk17 AS build
WORKDIR /app
COPY . /app
RUN gradle build -x test

FROM registry.access.redhat.com/ubi8/openjdk-17:latest
ENV LANGUAGE='en_US:en'
COPY --from=build /app/build/quarkus-app/lib/ /deployments/lib/
COPY --from=build /app/build/quarkus-app/*.jar /deployments/
COPY --from=build /app/build/quarkus-app/app/ /deployments/app/
COPY --from=build /app/build/quarkus-app/quarkus/ /deployments/quarkus/
EXPOSE 8080
USER 185
ENV JAVA_OPTS="-Dquarkus.http.host=0.0.0.0 -Djava.util.logging.manager=org.jboss.logmanager.LogManager"
ENV JAVA_APP_JAR="/deployments/quarkus-run.jar"