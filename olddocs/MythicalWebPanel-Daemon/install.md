---
sidebar_position: 2
---
# Installation 
These instructions will guide you through the installation and setup of the AtoroWebPanel.


# Linux
Before starting the installation, make sure you have the following prerequisites:

Ubuntu Linux (or compatible distribution)
root or sudo access
 
### Step 1: Install Dependencies
Install the required dependencies by running the following commands:
```bash
sudo apt update
sudo apt install -y git nginx certbot python3-certbot-nginx
wget https://dot.net/v1/dotnet-install.sh -O dotnet-install.sh
chmod +x ./dotnet-install.sh
./dotnet-install.sh --channel 6.0
sudo apt update && sudo apt upgrade -y
```
Configure environment variables:
```bash
cd && nano .bashrc
```
Add the following lines to the bottom of the file:
```bash
export DOTNET_ROOT=$HOME/.dotnet
export PATH=$PATH:$DOTNET_ROOT:$DOTNET_ROOT/tools
```
Save the file and exit the editor.
Reload the environment variables:
```bash
source ~/.bashrc
```
### Step 2: Clone the Repository
Clone the AtoroWebPanel-Daemon repository:
```bash
cd /home
git clone https://github.com/AtoroTech/AtoroWebPanel-Daemon.git
cd AtoroWebPanel-Daemon
```
### Step 3: Build and Configure AtoroWebPanel-Daemon
Build the AtoroWebPanel-Daemon project:
```bash
cd /home/AtoroWebPanel-Daemon
dotnet build
```
Create a directory for AtoroWeb-Daemon:
```bash
mkdir /home/AtoroWeb-Daemon
```
Copy the built files to the AtoroWeb-Daemon directory:
```bash
cp -a /home/AtoroWebPanel-Daemon/bin/Debug/net6.0/. /home/AtoroWeb-Daemon
```
Remove the cloned AtoroWebPanel-Daemon repository:
```bash
rm -r /home/AtoroWebPanel-Daemon
```
Reset the AtoroWebPanel-Daemon:
```bash
cd /home/AtoroWeb-Daemon
chmod u+x ./AtoroWebPanel-Daemon
./AtoroWebPanel-Daemon -reset
```
### Step 4: Configure SSL
Obtain an SSL certificate:
```bash
sudo certbot certonly --nginx -d <domain>
```
Replace `<domain>` with your domain name.

Set up certificate renewal with a cron job:
```bash
sudo crontab -e
```
Paste the following line in the file:
```bash
0 23 * * * certbot renew --quiet --deploy-hook "systemctl restart nginx"
```
Save the file and exit the editor.
### Step 5: Configure Nginx and Start AtoroWebPanel-Daemon
Create a systemd service for AtoroWeb-Daemon:
```bash
sudo nano /etc/systemd/system/AtoroWeb-Daemon.service
```
Paste the following content:
```bash
[Unit]
Description=AtoroWeb-Daemon

[Service]
User=root
WorkingDirectory=/home/AtoroWeb-Daemon
ExecStart=/root/.dotnet/dotnet /home/AtoroWeb-Daemon/AtoroWebPanel-Daemon.dll
Restart=on-failure
StartLimitInterval=180
StartLimitBurst=30
RestartSec=5s
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```
Save the file and exit the editor.
Enable and start the AtoroWeb-Daemon service:
```bash
sudo systemctl enable --now AtoroWeb-Daemon
sudo systemctl start AtoroWeb-Daemon
```
Remove the default Nginx configuration:
```bash
sudo rm /etc/nginx/sites-enabled/default
```
Create an Nginx configuration file for AtoroWebPanel-Daemon:
```bash
sudo nano /etc/nginx/sites-available/AtoroWebPanel-Daemon.conf
```
Paste the following content:
```bash
server {
  listen 80;
  server_name <domain>;
  return 301 https://$server_name$request_uri;
}
server {
  listen 443 ssl http2;

  server_name <domain>;
  ssl_certificate /etc/letsencrypt/live/<domain>/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/<domain>/privkey.pem;
  ssl_session_cache shared:SSL:10m;
  ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers  HIGH:!aNULL:!MD5;
  ssl_prefer_server_ciphers on;

  location / {
    proxy_pass http://localhost:3000/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_set_header Host $host;
    proxy_buffering off;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
```
Replace `<domain>` with your actual domain.
Create a symbolic link for the Nginx configuration:
```bash
sudo ln -s /etc/nginx/sites-available/AtoroWebPanel-Daemon.conf /etc/nginx/sites-enabled/AtoroWebPanel-Daemon.conf
```