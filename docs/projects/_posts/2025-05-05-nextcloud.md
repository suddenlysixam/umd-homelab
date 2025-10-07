---
title: "Nextcloud"
date: 2025-05-05
modify_date: 2025-05-05
cover: /assets/images/covers/2025-05-05_nextcloud.png
redirect_to:
  - /2025/05/05/meeting
---

# Prerequisites

{% include projects/prereq-pi.html %}

## Package installation

{% include projects/debian-start.html %}

## Nextcloud

```
sudo apt install apache2

sudo apt install lsb-release

curl https://packages.sury.org/php/apt.gpg | sudo tee /usr/share/keyrings/suryphp-archive-keyring.gpg >/dev/null

echo "deb [signed-by=/usr/share/keyrings/suryphp-archive-keyring.gpg] https://packages.sury.org/php/ $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/sury-php.list

sudo apt update

sudo apt install php8.2 php8.2-gd php8.2-sqlite3 php8.2-curl php8.2-zip php8.2-xml php8.2-mbstring php8.2-mysql php8.2-bz2 php8.2-intl php8.2-smbclient php8.2-imap php8.2-gmp php8.2-bcmath libapache2-mod-php8.2

sudo service apache2 restart
```

```
sudo apt install mariadb-server

sudo mysql_secure_installation

sudo mysql -u root -p

CREATE DATABASE nextclouddb;

CREATE USER 'nextclouduser'@'localhost' IDENTIFIED BY 'umdhomelabclub!';

GRANT ALL PRIVILEGES ON nextclouddb.* TO 'nextclouduser'@'localhost';

FLUSH PRIVILEGES;
```

```
sudo mkdir /srv/data

vim ~/.smbcredentials


username=<hostname>
password=umdhomelabclub!
domain=WORKGROUP

sudo vim /etc/fstab

//10.70.50.148/share<hostname> /srv/data cifs credentials=/home/labclub/.smbcredentials,x-systemd.automount,iocharset=utf8,rw,uid=33,gid=33,file_mode=0770,dir_mode=0770,vers=2.1 0 0

sudo systemctl daemon-reload

sudo mount -a
```

```
cd /var/www/

sudo wget https://download.nextcloud.com/server/releases/latest.tar.bz2

sudo tar -xvf latest.tar.bz2

sudo chown -R www-data:www-data /var/www/nextcloud/

sudo mkdir -p /srv/data/nextcloud/data
```

```
sudo vim /etc/apache2/sites-available/nextcloud.conf
```

```
Alias /nextcloud "/var/www/nextcloud/"

<Directory /var/www/nextcloud/>
  Require all granted
  AllowOverride All
  Options FollowSymLinks MultiViews

  <IfModule mod_dav.c>
    Dav off
  </IfModule>

</Directory>
```

```
sudo a2ensite nextcloud.conf

sudo systemctl reload apache2
```

```
sudo vim /etc/php/8.2/apache2/php.ini

post_max_size = 8M
upload_max_filesize = 2M

post_max_size = 1024M
upload_max_filesize = 1024M

sudo service apache2 restart
```

# Linux File/Storage Commands

## ls

```
ls
```

Useful options:
```
-a: all (including hidden)
-l: list format
-h: human readable sizes
--block-size: with specific size measure
--ignore=$ignorestring : do not list files that match the given string
```

e.g.
```
ls -al --block-size=GB
```
```
--block-size:
GB -- gigabytes (base 10)
G -- gibibytes (base 2)
MB -- megabytes (base 10)
M -- mebibytes (base 2)
```

```
ls -alh /dev/disk/by-path/
```

## pwd

## df

## findmnt

## mount / umount

```
mount $DEVICENAME $PATH
```

```
umount $DEVICENAME_OR_PATH
```

```
mount -a
```

## du

```
du -hs $PATH
```

```
du -h -d 1 | sort -h
```

```
-h: human readable
-d: depth
-s: summarize (display only a total for each argument)
-x: skip directories on different file systems
```

## lsblk

## blkid

## fdisk

```
fdisk -l
```

```
fdisk -l | grep '^Disk /dev/'
```

## file

```
file -sL /dev/sda3
```