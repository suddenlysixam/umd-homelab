# Download the standard MIB definitions
FROM debian:bookworm AS mibs

RUN sed -i 's/Components: main/Components: main non-free/' \
        /etc/apt/sources.list.d/debian.sources \
    && apt-get update \
    && apt-get install -y --no-install-recommends snmp-mibs-downloader


# Telegraf image
FROM telegraf:latest

USER root

COPY --from=mibs /var/lib/mibs /var/lib/mibs

RUN mkdir -p /usr/share/snmp/mibs \
    && ln -s /var/lib/mibs/ietf /usr/share/snmp/mibs/ietf \
    && ln -s /var/lib/mibs/iana /usr/share/snmp/mibs/iana

USER telegraf
