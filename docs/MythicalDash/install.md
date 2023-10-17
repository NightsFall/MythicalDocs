---
sidebar_position: 2
---
# Installing

MythicalDash is designed to run on your own web server. You will need to have root access to your server in order to run and use this panel.
You are expected to understand how to read documentation to use this client area. We have spent many hours detailing how to install or upgrade our software; take some time and read rather than copy and pasting and then complaining when things do not work. 

## Picking a Server OS
MythicalDash runs on a small range of operating systems, so pick whichever you are most comfortable using.

| Operating System | Version | Supported | Notes |
| - | - | - | - |
| [Ubuntu](#dependency-installation-ubuntu) | 20.04 | ✅ | Documentation written assuming Ubuntu 20.04 as the base OS. |
| [Ubuntu](#dependency-installation-ubuntu)  | 22.04 | ✅ | MariaDB can be installed without the repo setup script. |
| [Debian](#dependency-installation-debian) | 11 | ✅ | It can run, but we recommend using 12 for long-term usage! |
| [Debian](#dependency-installation-debian)  | 12 | ✅ | The dash is developed on this os! |
| CentOS | 7 | ❌ | It can run, but we don't provide support for it. |
| CentOS | 8 | ❌ | It can run, but we don't provide support for it. |
| AlamaLinux | 9 | ❌ | It can run, but we don't provide support for it. |
| AlamaLinux | 8 | ❌ | It can run, but we don't provide support for it. |
## Dependency Installation (Ubuntu)
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
apt -y install php8.2 php8.2-{common,cli,gd,mysql,mbstring,bcmath,xml,fpm,curl,zip} mariadb-server nginx tar unzip zip git redis-server
```

## Dependency Installation (Debian)
The commands below are simply an example of how you might install these dependencies. Please consult with your operating system's package manager to determine the correct packages to install.
```bash
# Update the server
apt update && apt upgrade -y
# Install necessary packages
apt -y install software-properties-common curl ca-certificates gnupg2 sudo lsb-release

# Add additional repositories for PHP, Redis, and MariaDB
echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/sury-php.list
curl -fsSL https://packages.sury.org/php/apt.gpg | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/sury-keyring.gpg

# Update repositories list
apt update

# Install PHP and required extensions
apt install -y php8.2 php8.2-{common,cli,gd,mysql,mbstring,bcmath,xml,fpm,curl,zip}

# MariaDB repo setup script
curl -sS https://downloads.mariadb.com/MariaDB/mariadb_repo_setup | sudo bash

# Install the rest of dependencies
apt install -y mariadb-server nginx tar unzip git redis-server zip
```

## Installing Composer
Composer is a dependency manager for PHP that allows us to ship everything you'll need code wise to operate the dash. You'll need composer installed before continuing in this process.
```bash 
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
```

## Download Files
The first step in this process is to create the folder where the dashboard will live and then move ourselves into that newly created folder. Below is an example of how to perform this operation.
```bash
cd /var/www
git clone https://github.com/mythicalltd/mythicaldash.git client
```
Once it is downloaded you'll need to unpack the archive and then set the correct permissions on the core/ and tmp/ directories. These directories allow us to store files as well as keep a speedy cache available to reduce load times.
```bash
chown -R www-data:www-data /var/www/client/*
```
## Composer 
After you've downloaded all of the files you will need to upgrade the core components of the client. To do this, simply run the commands below and follow any prompts.
```bash
cd /var/www/client
composer install --no-dev --optimize-autoloader
```
## Installation
Now that all of the files have been downloaded we need to configure some core aspects of the Dashboard.
You will need a database setup and a user with the correct permissions created for that database before continuing any further.

```sql
mysql -u root -p
CREATE USER 'mythicaldash'@'127.0.0.1' IDENTIFIED BY 'yourPassword';
CREATE DATABASE dash;
GRANT ALL PRIVILEGES ON dash.* TO 'mythicaldash'@'127.0.0.1' WITH GRANT OPTION;
exit
```

## Environment Configuration
MythicalDash's core environment is easily configured using a few different CLI commands built into the app. This step will cover setting up things such as settings and database credentials.
```bash
# Run this for our small checkup that we need to run for the cli to run
cd /var/www/client
bash arch.bash
chmod +x ./MythicalDash
./MythicalDash -generate-config # Generate a custom config file
./MythicalDash -key-generate # Reset the encryption key
./MythicalDash -config-database # Setup the database connection
./MythicalDash -migrate-database-now # Migrate the database
./MythicalDash -config-setup # Start a custom setup for the dash
```

## Crontab Configuration
Setting up cron jobs will be really important; this is not an optional step: the cron jobs will allow the dashboard to process data internally, and manage the queue system. First, check if crontab is installed by typing "crontab -e" in your terminal. Or, if you are using a hosting service, check if your host supports crontab. If you are on a terminal, run:
```bash
sudo crontab -e
# Paste this in the first line
* * * * * php /var/www/client/crons/server.php >> /dev/null 2>&1
```
