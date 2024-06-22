FROM wordpress:6.5.4-apache

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer
RUN apt update
RUN apt install -y zip

COPY ./wp-content/plugins/readsonic/composer.json /var/www/html/wp-content/plugins/readsonic/composer.json
COPY ./wp-content/plugins/readsonic/composer.lock /var/www/html/wp-content/plugins/readsonic/composer.lock

WORKDIR /var/www/html/wp-content/plugins/readsonic

RUN composer install --no-dev

WORKDIR /var/www/html
