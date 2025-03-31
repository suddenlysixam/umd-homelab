---
title: "Self Hosted DNS"
date: 2025-03-03
modify_date: 2025-03-10
cover: /assets/images/covers/2025-03-03_self-hosted-dns-14.png
tags: network
---

<!-- # Self Hosted DNS
{:.no_toc} -->

<style>
  blockquote {
    background: #d9edf7;
    /* border: 1px solid SteelBlue; */
    border-radius: 5px;
    border-left: 5px solid #31708f !important;
    padding: 3px 10px !important;
    margin: 1px 40px 1px 30px;
    color: #31708f !important;
  }
</style>

<!-- * TOC
{:toc} -->

# Prerequisites

## What you will need

This project assumes that you have already followed our [Raspberry Pi installation](https://suddenlysixam.club/meetings/past_meetings/2024-12-02-meeting.html) project, and have the resulting configured Raspberry Pi. If you are installing on different hardware or a different OS, these steps may not all be the same for you.

## Quick Review: What is DNS?

**(D)omain (N)ame (S)ystem**

Make DNS queries to lookup DNS records.

Very short explanation of some types of DNS records:

- A: "address", hostname -> IP address
- AAAA: "address x4" hostname -> IPv6 address
- PTR: "pointer", IP address -> hostname
- CNAME: "canonical name", hostname -> hostname
- MX: "mail exchange"
- TXT: "text"
- NS: "nameserver"

> &#9432; **Note:** This is just a quick review! Check out our last presentation for more info: [https://suddenlysixam.club/meetings/past_meetings/2025-02-24-meeting.html](https://suddenlysixam.club/meetings/past_meetings/2025-02-24-meeting.html)

> &#9432; **Note:** IPv4 32 bits, IPv6 128 bits, 32 x 4 = 128)

## Commands to help us test

### host
{:.no_toc}

host - DNS lookup utility ([man page](https://manpages.debian.org/bookworm/bind9-host/host.1.en.html))

e.g.

```
host google.com
```

### nslookup
{:.no_toc}

nslookup - query Internet name servers interactively ([man page](https://manpages.debian.org/bookworm/bind9-dnsutils/nslookup.1.en.html))

e.g.

```
nslookup google.com
```

```
nslookup -type=ns google.com
```

```
nslookup google.com 1.1.1.1
```

### dig
{:.no_toc}

dig - DNS lookup utility ([man page](https://manpages.debian.org/bookworm/bind9-dnsutils/dig.1.en.html))

e.g.

```
dig google.com
```

### ping
{:.no_toc}

ping — send ICMP ECHO_REQUEST packets to network hosts ([man page](https://manpages.debian.org/bookworm/inetutils-ping/ping.1.en.html))

e.g.

```
ping google.com
```

```
ping google.com -c 4
```

# Raspberry Pi BIND9 Setup

## Basic Pi Configuration

### Package installation: updates & basic network

```
sudo apt update
sudo apt upgrade
sudo apt install bind9-dnsutils
```

> &#9432; **Note:** `bind9-dnsutils` gives us (among other things) `nslookup` & `dig`. It has a package dependency for `bind9-host` which gives us `host`.

> &#9432; **Note:** `dnsutils` is a transitional package for `bind9-dnsutils`. So we will not use it here, but you may see `dnsutils` used in other guides.

### Set hostname

```
sudo vi /etc/hosts
sudo vi /etc/hostname
sudo shutdown -r now
```

One the host has finished rebooting, check to see if your changes applied:

```
hostname
```

> &#9432; **Note:** You might ask, why not use `sudo hostnamectl set-hostname <your-hostname>`? If you are curious, you can run this and then `cat` the mentioned files, and see what has changed.

> &#9432; **Note:** After you set the hostname and before you reboot, it may yell at you about the previous hostname name/service not being known.

### Local name resolution

Add a different hostname to `/etc/hosts`:

```
sudo vi /etc/hosts
```

Then let's test the behavior of a few different commands:

```
host <hostname>
nslookup <hostname>
dig <hostname>
ping <hostname>
```

> &#9432; **Note:** You can test what happens with your own device's hostname that we configured in the last step too.

### Set a static IP

In our case, we will be using _NetworkManager_ to set a static IP.

```
nmcli
nmcli connection show
```

Take note of the "Name" of the connection you are using. (NOT the "Device". Sometimes these will be the same, but not always.)

```
nmcli con mod "<connection-name>" ipv4.addresses <ip-address>/<subnet-mask>
nmcli con mod "<connection-name>" ipv4.gateway <gateway-ip-address>
nmcli con mod "<connection-name>" ipv4.method manual
nmcli con down "<connection-name>" && nmcli con up "<connection-name>"
```

```
nmcli
```

> &#9432; **Note:** How you set a static IP will greatly vary by OS and OS version.

> &#9432; **Note:** Some parts of these commands can be shortened, such as `connection` > `con`. Some can be shortened even further.

> &#9432; **Note:** `sudo systemctl restart NetworkManager` will add the new config, but will not remove the old, which is not ideal. This is why we are running the `up` and `down` commands for the connection. You could also reboot your pi.

> &#9432; **Note:** `<subnet-mask>` based on the netmask
> Subnet mask cheat sheet: [https://dnsmadeeasy.com/support/subnet](https://dnsmadeeasy.com/support/subnet)

## BIND9 Configuration

### Package installation: BIND9

```
sudo apt install bind9 bind9-utils
```

(optional)

```
sudo apt install bind9-doc
```

> &#9432; **Note:** BIND9 is not the only choice, it is just our choice

> &#9432; **Note:** `bind9` for the service, `bind9-utils` for ways to check our work, `bind9-docs` for documentation.)
> Additional package info: [https://www.kali.org/tools/bind9/](https://www.kali.org/tools/bind9/)

> &#9432; **Note:** `bind9utils` is a transitional package for `bind9-utils`. So we will not use it here, but you may see `bind9utils` used in other guides.)

### Configuration files

#### /etc/systemd/system/bind9.service
{:.no_toc}

First, lets look at the systemd service for bind9:

```
cat /etc/systemd/system/bind9.service
```

Take note of:\
`EnvironmentFile=-/etc/default/named`\
`ExecStart=/usr/sbin/named -f $OPTIONS`\
`Alias=bind9.service`

> &#9432; **Note:** In the `bind9.service` file, the `=-`, indicates that if the file does not exist, it will not be read and no error or warning message is logged.

Next lets take a look at the current status of the service:

```
systemctl status bind9
systemctl status named
```

#### /etc/init.d/named
{:.no_toc}

Because of what we have now observed, lets look at the `named` service script:

```
cat /etc/init.d/named | less
```

We can see that this has a comment about creating/changing `/etc/default/named` (and this was the `EnvironmentFile` that we noted earlier), so let's take a look at that next.

#### /etc/default/named
{:.no_toc}

```
sudo vi /etc/default/named
```

Lets configure this to run only on IPv4 by adding `-4` to the options.

Default: `OPTIONS="-u bind"`\
Change to: `OPTIONS="-u bind -4"`

#### /etc/bind/named.conf
{:.no_toc}

```
cat /etc/bind/named.conf
```

You should see 3 included conf files, which we are going to begin configuring for different things:\
`/etc/bind/named.conf.options` (ACLs, forwarders, port, etc.)\
`/etc/bind/named.conf.local` (declare our zones)\
`/etc/bind/named.conf.default-zones` (default zone declarations)

Throughout this you may also want to be checking your work, but I am not going to list this command after every step. Validate your changes as you go.

```
sudo named-checkconf
```

#### named.conf.options
{:.no_toc}

> &#9432; **Note:** If you would like to look at all the options, and installed `bind9-doc`, you can take a look at `/usr/share/doc/bind9/options.gz`.

Add an (A)ccess (C)ontrol (L)ist:

```
sudo vi /etc/bind/named.conf.options
```

Put the following statement above the `options {...}` statement:

```
acl trusted {
        10.70.50.0/24;
        localhost;
        localnets;
};
```

> &#9432; **Note:**BIND has the following built-in ACLs:\
> `none`: Matches no hosts.\
> `any`: Matches all hosts.\
> `localhost`: 127.0.0.1 and ::1, as well as the IP addresses of all interfaces on the server that runs BIND.\
> `localnets`: 127.0.0.1 and ::1, as well as all subnets the server that runs BIND is directly connected to.

> &#9432; **Note:** You could put the ACL directly in `named.conf`, however since we are going to use it in `named.conf.options` I'm putting it here.

**Now add some configuration within the `options {...}` statement:**

Allow DNS queries from the ACL we defined:

```
    allow-query     { trusted; };
    allow-recursion { trusted; };    # allow them to recursively query authoritative DNS servers for the queried domain
```

Forward requests for records that this server does not have:

```
    forward only;    # don't attempt to contact other NS if forwarders not available
    forwarders {
      1.1.1.1;
      1.0.0.1;
    };
```

Only IPv4. Change the second IP to that of the pi.

```
    listen-on port 53 { 127.0.0.1; 10.70.50.104; };
    listen-on-v6 { none; };
```

Others:

```
    auth-nxdomain no;    # conform to RFC1035 - yes/no answer authoritative if NXDOMAIN
    allow-transfer { none; };    # Do not transfer the zone information to the secondary DNS
```

#### named.conf.local
{:.no_toc}

```
sudo vi /etc/bind/named.conf.local
```

Declare the zones associated with this server's domain(s). Replace domain(s) and IP address(s) as appropriate for your setup:

```
### Forward zones
zone "umdhomelab.local" {
	type master;
	file "/etc/bind/zones/umdhomelab.zone";
	allow-update { none; };    # no DDNS by default
};

### Reverse zones
# 10.70.50.0/24 subnet
zone "50.70.10.in-addr.arpa" {
	type master;
	file "/etc/bind/zones/10.70.50.zone";
	allow-update { none; };    # no DDNS by default
};
```

#### Other configuration
{:.no_toc}

You may want to do additional configuration, such as logging, but we aren't doing any more for the sake of brevity.

> &#9432; **Note:** [https://wiki.debian.org/Bind9](https://wiki.debian.org/Bind9)

### Configure zones

```
cd /etc/bind/
sudo mkdir ./zones
sudo cp db.local ./zones/umdhomelab.zone
sudo cp db.127 ./zones/10.70.50.zone
cd zones
```

#### umdhomelab.zone
{:.no_toc}

```
sudo vi umdhomelab.zone
```

Replace domain(s) and IP address(s) as appropriate for your setup:

```
;
; BIND data file for forward umdhomelab.local
;
$TTL    604800
@       IN      SOA     druid.umdhomelab.local. admin.umdhomelab.local. (
                     2025030300         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                         604800 )       ; Negative Cache TTL
;
; name servers - NS records
        IN      NS      druid.umdhomelab.local.

$ORIGIN umdhomelab.local.

; name servers - A records
druid               IN      A       10.70.50.130

; 10.70.50.0/24
paladin             IN      A       10.70.50.104
```

> &#9432; **Note:** The serial that I've configured here is the date plus a two digit integer `YYYYMMDDxx`. It needs to be updated / incremented by at least 1 every time you make changes. You could simply make this an integer starting at 1, but that would go against my training.

> &#9432; **Note:** `$ORIGIN` defines a base name from which 'unqualified' names (those without a terminating dot) substitutions are made when processing the zone file.

#### 10.70.50.zone
{:.no_toc}

```
sudo vi 10.70.50.zone
```

Replace domain(s) and IP address(s) as appropriate for your setup:

```
;
; BIND data file for reverse 50.70.10.in-addr.arpa
;
$TTL    604800
@       IN      SOA     druid.umdhomelab.local. admin.umdhomelab.local. (
                     2025030300         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                         604800 )       ; Negative Cache TTL
;
; name servers - NS records
		IN      NS      druid.umdhomelab.local.

$ORIGIN 50.70.10.in-addr.arpa.

; Name Servers - PTR Records
130      IN     PTR     druid.umdhomelab.local.

; PTR Records
104      IN     PTR     paladin.umdhomelab.local.
```

### Does it work?

Check your work. Is it OK?

```
named-checkzone umdhomelab.local umdhomelab.zone
named-checkzone 50.70.10.in-addr.arpa 10.70.50.zone
```

Restart the service. Make sure its still running properly.

```
sudo systemctl restart named
systemctl status named
```

Now what happens when we run:

```
nslookup <hostname>
nslookup <hostname> 127.0.0.1
nslookup <hostname>.umdhomelab.local 127.0.0.1
dig @127.0.0.1 <hostname>.umdhomelab.local
```

## Using our new DNS server

### Find your current DNS server

```
cat /etc/resolv.conf
```

> &#9432; **Note:** Don't overlook the lack of an `e` in `resolv.conf`. Tab complete is your friend.)

> &#9432; **Note:** Additionally note the `Generated by` line at the top of the file, if there is one. This may indicate that we do not want to edit this file directly.

### Setting different DNS servers

In our case, we will be using _NetworkManager_ to modify our DNS servers.

```
nmcli
nmcli connection show
```

Take note of the "Name" of the connection you are using. (NOT the "Device". Sometimes these will be the same, but not always.)

```
nmcli con mod "<connection-name>" ipv4.dns "<space-separated-dns-ips>"
nmcli con mod "<connection-name>" ipv4.ignore-auto-dns yes
nmcli con down "<connection-name>" && nmcli con up "<connection-name>"
```

```
nmcli
```

(Optional) Set a search domain

```
nmcli con mod "<connection-name>" ipv4.dns-search "<domain>"
nmcli con down "<connection-name>" && nmcli con up "<connection-name>"
```

```
nmcli
```

> &#9432; **Note:** How you modify your DNS servers will greatly vary by OS and OS version.

> &#9432; **Note:** `sudo systemctl restart NetworkManager` will add the new config, but will not remove the old, which is not ideal. This is why we are running the `up` and `down` commands for the connection. You could also reboot your pi.

### Does it work? (pt 2.)

Now what happens when we run:

```
nslookup <hostname>
nslookup <hostname>.umdhomelab.local
dig <hostname>
dig <hostname>.umdhomelab.local
```

## Troubleshooting

### General reminders
{:.no_toc}

Increment the serial each time you make changes!

Check your work:

```
named-checkconf
named-checkzone <zonename> <filename>
```

e.g.

```
named-checkzone umdhomelab.local umdhomelab.zone
named-checkzone 50.70.10.in-addr.arpa 10.70.50.zone
```

### Can you connect to port 53?
{:.no_toc}

```
telnet <remote-server> 53
```

e.g.

```
bash-3.2$ telnet 1.1.1.1 53
Trying 1.1.1.1...
Connected to one.one.one.one.
Escape character is '^]'.
```

```
nc -vz -w 1 \<remote-server\> 53
nc -vuz -w 1 \<remote-server\> 53
```

e.g.

```
bash-3.2$ nc -vz -w 1 1.1.1.1 53
Connection to 1.1.1.1 port 53 [tcp/domain] succeeded!
bash-3.2$ nc -vuz -w 1 1.1.1.1 53
Connection to 1.1.1.1 port 53 [udp/domain] succeeded!
bash-3.2$
```

### Is port 53 open?
{:.no_toc}

```
sudo netstat -tulpn | grep :53
sudo lsof -Pi | grep LISTEN
sudo nmap -sS localhost
sudo nmap -sU localhost
```

Have you configured any variety of firewall? And the follow up question, have you configured it to allow DNS / port 53? (e.g. `iptables`, `nftables`, `firewalld`, `ufw`)

> &#9432; **Note:** If you are following this guide with the same hardware/software, you should not **_need_** to configure this out of the box. I am including it because different OS'es may ship with a firewall already in place, and in practice you would want to configure this further.

### named service
{:.no_toc}

```
systemctl status named
sudo journalctl -u named
```

# Final thoughts

Hopefully you've now got DNS up and running! If you ran into any issues not mentioned here, have suggestions for the guide, or have any additional questions, please reach out to us in the [Discord](https://suddenlysixam.club/discord).

_Home is where the lab is. ~Megan_
