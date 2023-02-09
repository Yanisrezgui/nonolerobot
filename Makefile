build:
	@echo "Installing npm dependencies..."
	@npm install
	@docker build .

run:
	@echo "Running app..."
	@docker compose up -d
	@echo "App running on : http://localhost:3333"

run log:
	@echo "Running app with logs..."
	@docker compose up
	@echo "App running on : http://localhost:3333"

stop:
	@echo "Stopping app..."
	@docker compose down
	@echo "App stopped"