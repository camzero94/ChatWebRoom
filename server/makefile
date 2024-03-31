run:
	go run cmd/main/main.go
unit-tests:
	go test ./...
funcitonal-test:
	go test ./functional_tests/transformer_test.go
build:
	go build -o ./bin/server cmd/main/main.go
build-docker:
	docker build -t backend -f Dockerfile.dev .

