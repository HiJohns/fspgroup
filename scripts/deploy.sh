#!/bin/bash
# FTP Deployment Script for FSPGROUP Website

set -e

# Configuration
FTP_HOST="${FSPGROUP_FTP_HOST:-}"
FTP_USER="${FSPGROUP_FTP_USERNAME:-}"
FTP_PASS="${FSPGROUP_FTP_PASSWORD:-}"
BACKUP_DIR="backup"
JS_SOURCE="dist/js"
JS_REMOTE_DIR="dist/js"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# Step 1: Test FTP connection
log "Testing FTP connection to $FTP_HOST..."
if ! lftp -c "
    open -u $FTP_USER,$FTP_PASS $FTP_HOST
    ls
" >/dev/null 2>&1; then
    error "FTP connection failed. Please check credentials and host."
fi
log "FTP connection successful!"

# Step 2: Check if dist/js directory exists locally
if [ ! -d "$JS_SOURCE" ]; then
    warn "dist/js directory does not exist locally."
    read -p "Do you want to download from FTP first? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        error "Cannot proceed without dist/js files"
    fi
    
    # Download from FTP
    log "Downloading dist/js from FTP..."
    mkdir -p "$JS_SOURCE"
    lftp -c "
        open -u $FTP_USER,$FTP_PASS $FTP_HOST
        mirror -c --parallel=3 $JS_REMOTE_DIR/ $JS_SOURCE/
    " || error "Failed to download from FTP"
fi

# Step 3: Create backup directory
log "Creating backup directory..."
mkdir -p "$BACKUP_DIR"

# Step 4: Download existing files from FTP for backup
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/${TIMESTAMP}.zip"

log "Creating backup of current FTP files..."
lftp -c "
    open -u $FTP_USER,$FTP_PASS $FTP_HOST
    cd $JS_REMOTE_DIR
    glob -a rm *.tmp
    mget *.min.js -O /tmp/js_backup_$$/
" 2>/dev/null || true

if [ -d "/tmp/js_backup_$$" ] && [ "$(ls -A /tmp/js_backup_$$ 2>/dev/null)" ]; then
    cd /tmp/js_backup_$$
    zip -r "$BACKUP_FILE" ./*.min.js >/dev/null 2>&1
    cd -
    rm -rf /tmp/js_backup_$$
    log "Backup created: $BACKUP_FILE"
else
    warn "No existing files found on FTP or download failed"
fi

# Step 5: Clean old backups (older than 180 days)
log "Cleaning old backups..."
find "$BACKUP_DIR" -name "*.zip" -type f -mtime +180 -delete

# Step 6: Upload local files to FTP
if [ -d "$JS_SOURCE" ] && [ "$(ls -A $JS_SOURCE/*.min.js 2>/dev/null)" ]; then
    log "Uploading files to FTP..."
    lftp -c "
        open -u $FTP_USER,$FTP_PASS $FTP_HOST
        cd $JS_REMOTE_DIR
        mput $JS_SOURCE/*.min.js
        chmod 644 *.min.js
    " || error "Failed to upload files"
    log "Upload completed successfully!"
else
    warn "No .min.js files found in $JS_SOURCE"
fi

log "Deployment process completed!"
exit 0