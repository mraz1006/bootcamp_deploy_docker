FROM alpine:3.17.3

# Install curl
RUN apk update && apk add --no-cache curl

# Run curl command.
RUN curl https://api.github.com/users/progate

CMD ["echo", "{\"login\": \"hello\"}"]

