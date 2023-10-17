---
sidebar_position: 6
---
# Update MythicalDash

This documentation covers the process for updating within the 1.x series of releases. This means updating from — for example — 1.0.0 to 1.1.0

## Download the Update
The first step in the update process is to download the new client files from GitHub. The command below will download the release archive for the most recent version of MythicalDash.
```bash
cd /var/www/client
mariadb-dump -p mythicaldash > mythicaldash_backup.sql
cd /var/www
zip -r clientbackup.zip client/
cd /var/www/client
git fetch --all
git reset --hard origin/develop
sudo bash arch.bash
rm /var/www/client/public/FIRST_USER # Remove this
```
## Update Dependencies
After you've downloaded all of the new files you will need to upgrade the core components of the dash. To do this, simply run the commands below and follow any prompts.
```bash
composer install --no-dev --optimize-autoloader
```

## Database Updates
You'll also need to update your database schema for the newest version of MythicalDash.
```bash
./MythicalDash -migrate-database-now 
``` 

## Set Permissions
The last step is to set the proper owner of the files to be the user that runs your webserver. In most cases this is www-data but can vary from system to system — sometimes being nginx, caddy, apache, or even nobody.
```bash
# If using NGINX or Apache (not on CentOS):
chown -R www-data:www-data /var/www/pterodactyl/*

# If using NGINX on CentOS:
chown -R nginx:nginx /var/www/pterodactyl/*

# If using Apache on CentOS
chown -R apache:apache /var/www/pterodactyl/*
```
## Done
You are done, and now you should be running the latest version of MythicalDash.
