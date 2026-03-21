.PHONY: build deploy deploy-ftp

# Build the project
build:
	@echo "Building project..."
	@if [ -f package.json ]; then \
		npm run build || echo "Build failed or not defined"; \
	else \
		echo "No package.json found, skipping build"; \
	fi

# Deploy to FTP (alias for deploy-ftp)
deploy: deploy-ftp

# Deploy to FTP server
deploy-ftp:
	@echo "Starting FTP deployment..."
	@chmod +x scripts/deploy.sh
	@bash scripts/deploy.sh

# Create backup only
backup:
	@echo "Creating backup..."
	@mkdir -p backup
	@TIMESTAMP=$$(date +%Y%m%d_%H%M%S); \
	if [ -d dist/js ] && [ "$$(ls -A dist/js/*.min.js 2>/dev/null)" ]; then \
		cd dist/js && zip -r ../../backup/$$TIMESTAMP.zip *.min.js && cd ../..; \
		echo "Backup created: backup/$$TIMESTAMP.zip"; \
	else \
		echo "No .min.js files to backup"; \
	fi

# Clean old backups
clean-backup:
	@echo "Cleaning old backups (>180 days)..."
	@find backup -name "*.zip" -type f -mtime +180 -delete

# Initialize project directories
init:
	@mkdir -p backup
	@mkdir -p dist/js
	@chmod +x scripts/deploy.sh
	@echo "Project initialized"