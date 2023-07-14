---
sidebar_position: 2
---
# Installation 
These instructions will guide you through the installation and setup of the MythicalWebPanel.


# Linux
Before starting the installation, make sure you have the following prerequisites:

Ubuntu Linux (or compatible distribution)
root or sudo access
 
### Step 1: Install Dependencies
Install the required dependencies by running the following commands:
```bash
apt -y install software-properties-common curl apt-transport-https ca-certificates gnupg
LC_ALL=C.UTF-8 add-apt-repository -y ppa:ondrej/php
curl -sS https://downloads.mariadb.com/MariaDB/mariadb_repo_setup | sudo bash
apt update
apt-add-repository universe
apt -y install php8.2 php8.2-{common,cli,gd,mysql,mbstring,bcmath,xml,fpm,curl,zip} mariadb-server nginx tar unzip git certbot python3-certbot-nginx
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
```
### Step 2: Configure MariaDB
Configure MariaDB by creating a new user and database. Run the following commands:
```bash
mysql -u root -p
```
Enter your MySQL root password when prompted. Then, execute the following SQL statements within the MySQL shell:
```sql
CREATE USER 'MythicalTech'@'127.0.0.1' IDENTIFIED BY '<password>';
CREATE DATABASE Mythicalwebpanel;
GRANT ALL PRIVILEGES ON Mythicalwebpanel.* TO 'MythicalTech'@'127.0.0.1' WITH GRANT OPTION;
exit;
```
Replace `<password>` with the desired password for the 'MythicalTech' user.
### Step 3: Clone MythicalWebPanel Repository
Clone the MythicalWebPanel repository into the appropriate directory. Run the following commands:
```bash
cd /var/www
git clone https://github.com/MythicalTech/MythicalWebPanel.git
cd MythicalWebPanel
composer install --no-dev --optimize-autoloader
chown -R www-data:www-data /var/www/MythicalWebPanel/*
```
### Step 4: Configure Nginx
Remove the default Nginx configuration file and create a new one for MythicalWebPanel. Run the following commands:
```bash
rm /etc/nginx/sites-enabled/default
nano /etc/nginx/sites-available/MythicalWebPanel.conf
```
In the nano editor, paste the following configuration:
```
server_tokens off;

server {
    listen 80;
    server_name <domain>;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name webpanel.mythicalsystems.tech;

    root /var/www/MythicalWebPanel/public;
    index index.php;

    access_log /var/log/nginx/MythicalWebPanel.app-access.log;
    error_log  /var/www/MythicalWebPanel/logs/app-error.log error;

    # allow larger file uploads and longer script runtimes
    client_max_body_size 100m;
    client_body_timeout 120s;

    sendfile off;

    # SSL Configuration - Replace the example <domain> with your domain
    ssl_certificate /etc/letsencrypt/live/<domain>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<domain>/privkey.pem;
    ssl_session_cache shared:SSL:10m;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384";
    ssl_prefer_server_ciphers on;

    # See https://hstspreload.org/ before uncommenting the line below.
    # add_header Strict-Transport-Security "max-age=15768000; preload;";
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Robots-Tag none;
    add_header Content-Security-Policy "frame-ancestors 'self'";
    add_header X-Frame-Options DENY;
    add_header Referrer-Policy same-origin;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param PHP_VALUE "upload_max_filesize = 100M \n post_max_size=100M";
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param HTTP_PROXY "";
        fastcgi_intercept_errors off;
        fastcgi_buffer_size 16k;
        fastcgi_buffers 4 16k;
        fastcgi_connect_timeout 300;
        fastcgi_send_timeout 300;
        fastcgi_read_timeout 300;
        include /etc/nginx/fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }
}
```
Replace `<domain>` with your domain name in the Nginx configuration.
### Step 5: Obtain SSL Certificate
Obtain an SSL certificate for your domain using Certbot. Run the following command:
```bash
certbot certonly --nginx -d <domain>
```
Replace `<domain>` with your domain name.
### Step 6: Enable Nginx Configuration
Create a symbolic link to enable the MythicalWebPanel Nginx configuration. Run the following command:
```bash
sudo ln -s /etc/nginx/sites-available/MythicalWebPanel.conf /etc/nginx/sites-enabled/MythicalWebPanel.conf
```
### Step 7: Restart Nginx
Restart the Nginx service to apply the changes. Run the following command:
```bash
sudo systemctl restart nginx
```

