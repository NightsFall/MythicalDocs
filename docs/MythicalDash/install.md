---
sidebar_position: 2
---


# Installing

### Dependency Installation

The commands below are simply an example of how you might install these dependencies. Please consult with your operating system's package manager to determine the correct packages to install.

```bash
# Update the server
apt update && apt upgrade -y
# Add "add-apt-repository" command
apt -y install software-properties-common curl apt-transport-https ca-certificates gnupg
# Add additional repositories for PHP, Redis, and MariaDB
LC_ALL=C.UTF-8 add-apt-repository -y ppa:ondrej/php
# MariaDB repo setup script can be skipped on Ubuntu 22.04
curl -sS https://downloads.mariadb.com/MariaDB/mariadb_repo_setup | sudo bash
# Update repositories list
apt update
# Add universe repository if you are on Ubuntu 18.04
apt-add-repository universe
# Install Dependencies
apt -y install php8.2 php8.2-{common,cli,gd,mysql,opcache,soap,mbstring,bcmath,xml,fpm,curl,zip,xmlrpc,imagick,dev,imap,intl} libapache2-mod-php8.2 mariadb-server apache2 certbot zip tar unzip git 
```

### Download Files

The first step in this process is to create the folder where the dashboard will live and then move ourselves into that newly created folder. Below is an example of how to perform this operation.

```bash
mkdir -p /var/www/client
cd /var/www/client
```
Once you have created a new directory for the Dashboard and moved into it you'll need to download the Dashboard files. This is as simple as using curl to download our pre-packaged content. Once it is downloaded you'll need to unpack the archive and then set the correct permissions on the core/ and tmp/ directories. These directories allow us to store files as well as keep a speedy cache available to reduce load times.

```bash
curl -Lo client.zip https://github.com/MythicalLTD/MythicalDash/releases/latest/download/client.zip
unzip client.zip
chown -R www-data:www-data /var/www/client/*
```

### Installation

Now that all of the files have been downloaded we need to configure some core aspects of the Dashboard.
Database Configuration

You will need a database setup and a user with the correct permissions created for that database before continuing any further.
```mysql
mysql -u root -p
# Remember to change 'yourPassword' below to be a unique password
CREATE USER 'mythicaldash'@'127.0.0.1' IDENTIFIED BY 'yourPassword';
CREATE DATABASE dash;
GRANT ALL PRIVILEGES ON dash.* TO 'mythicaldash'@'127.0.0.1' WITH GRANT OPTION;
exit
```

### Crontab Configuration

Setting up cron jobs will be really important; this is not an optional step: the cron jobs will allow the dashboard to process data internally, and manage the queue system. First, check if crontab is installed by typing "cron" in your terminal. Or, if you are using a hosting service, check if your host supports crontab. If you are on a terminal, run:

```bash
sudo crontab -e
*/2 * * * * php /var/www/client/core/scripts/queueHandler.php >/dev/null 2>&1
```
