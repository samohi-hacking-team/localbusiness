FROM golang:latest

RUN mkdir -p /go/src/webserver

WORKDIR /go/src/webserver

COPY . /go/src/webserver

RUN go install webserver

CMD /go/bin/webserver

EXPOSE 8080