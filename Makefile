SHELL := /bin/bash

MAKEFLAGS += --no-print-directory --always-make

LOCAL_PATTERN=$(notdir $(shell pwd))

build:
	@bash ./node_modules/.bin/musical-pattern build tsc

clean_updates:
	@bash ./node_modules/.bin/musical-pattern clean_updates

commit:
	@bash ./node_modules/.bin/musical-pattern commit

lint:
	@bash ./node_modules/.bin/musical-pattern lint

publish:
	@bash ./node_modules/.bin/musical-pattern publish

pull:
	@bash ./node_modules/.bin/musical-pattern pull

push:
	@bash ./node_modules/.bin/musical-pattern push

ship:
	@set -e; pushd ../..; make ship PATTERN=${LOCAL_PATTERN}; popd

snapshot:
	@bash ./node_modules/.bin/musical-pattern snapshot

test:
	@bash ./node_modules/.bin/musical-pattern test

update:
	@set -e; pushd ../..; make update PATTERN=${LOCAL_PATTERN}; popd
