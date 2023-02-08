build:
	@echo "Installing npm dependencies..."
	@cd ./app && npm install

run:
	@echo "Running app..."
	@docker compose up -d
	@echo "App running on : http://localhost:3333"

stop:
	@echo "Stopping app..."
	@docker compose down
	@echo "App stopped"