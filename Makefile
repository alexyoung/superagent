
SRC = $(shell find lib/*.js)

all: superagent.js superagent.min.js

superagent.js: $(SRC)
	cat $^ > $@

superagent.min.js: superagent.js
	uglifyjs --no-mangle $< > $@

test:
	@node test/server

docs: $(SRC)
	dox --json $^ > docs.json
	node docs

clean:
	rm -f superagent{,.min}.js

.PHONY: test docs clean