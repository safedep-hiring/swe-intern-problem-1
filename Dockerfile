FROM golang

RUN mkdir /app

ADD . /app

WORKDIR /app

RUN go mod init github.com/travis2319/shellHistory
RUN go get github.com/gofiber/fiber/v2
RUN go get github.com/jackc/pgx/v5/pgxpool
RUN go get github.com/mattn/go-isatty@v0.0.20

RUN go build -o main ./main.go

EXPOSE 8080

CMD [ "/app/main" ]