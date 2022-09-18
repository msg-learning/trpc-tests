.PHONY: build-nvim, nvim, build-dev, dev

IMAGE_NAME = "trpcnvim:latest"
CONTAINER_NAME = "trpcnvim-dev"
USER_NAME = $(shell id -u -n)

build-nvim:
	docker build \
		-t $(IMAGE_NAME) \
		-f Dockerfile.nvim \
		.

nvim:
	docker run \
		-it \
		--rm \
		--name $(CONTAINER_NAME) \
		-v ~/.ssh:/home/$(USER_NAME)/.ssh \
		-v ~/.gnupg:/home/$(USER_NAME)/.gnupg \
		-v $(shell pwd):/home/$(USER_NAME)/workdir \
		$(IMAGE_NAME)

build-dev:
	docker build \
		-t trpctests \
		-f Dockerfile.dev \
		.

dev:
	docker run \
		-it \
		--rm \
		-p 3000:3000 \
		-v $(shell pwd):/var/workdir \
		trpctests \
		/bin/bash


