---
sidebar_position: 4
---

# Webserver 

First, remove the default Apache configuration.

```bash
a2dissite 000-default.conf
```
Now, you should paste the contents of the file below, replacing ``<domain>`` with your domain name being used in a file called ``MythicalDash.conf`` and place the file in ``/etc/apache2/sites-available``

```txt
<VirtualHost *:80>
  ServerName <domain>
  
  RewriteEngine On
  RewriteCond %{HTTPS} !=on
  RewriteRule ^/?(.*) https://%{SERVER_NAME}/$1 [R,L] 
</VirtualHost>
<VirtualHost *:443>
  ServerName <domain>
  DocumentRoot "/var/www/client"
  AllowEncodedSlashes On
  
  php_value upload_max_filesize 100M
  php_value post_max_size 100M
  <Directory "/var/www/client">
    Require all granted
    AllowOverride all
  </Directory>
 <FilesMatch \.php$>
      SetHandler "proxy:unix:/run/php/php8.2-fpm.sock|fcgi://localhost"
  </FilesMatch>
  ErrorLog ${APACHE_LOG_DIR}/mythicaldash.log
  CustomLog ${APACHE_LOG_DIR}/mythicaldash  _access.log combined
  SSLEngine on
  SSLCertificateFile /etc/letsencrypt/live/<domain>/fullchain.pem
  SSLCertificateKeyFile /etc/letsencrypt/live/<domain>/privkey.pem
</VirtualHost> 
```

### Enabling Configuration

Once you've created the file above, simply run the commands below.

```bash
sudo ln -s /etc/apache2/sites-available/MythicalDash.conf /etc/apache2/sites-enabled/MythicalDash.conf
sudo a2enmod actions fcgid alias proxy_fcgi rewrite ssl
sudo systemctl restart apache2
```