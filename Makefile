commit:
	../../node_modules/@musical-patterns/cli/bin/commit.sh

.PHONY: lint
lint:
	pushd ../..; DIR="src/beatenPath" make lint; popd

pull:
	../../node_modules/@musical-patterns/cli/bin/pull.sh

push:
	../../node_modules/@musical-patterns/cli/bin/push.sh

.PHONY: test
test:
	pushd ../..; JASMINE_CONFIG_PATH="src/beatenPath/test/jasmine.js" PATTERN_NAME="BEATEN_PATH" make test; popd
