FROM wordpress:6.3.0-apache

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer
RUN apt update
RUN apt install -y zip

COPY ./wp-content/plugins/audioblog/composer.json /var/www/html/wp-content/plugins/audioblog/composer.json
COPY ./wp-content/plugins/audioblog/composer.lock /var/www/html/wp-content/plugins/audioblog/composer.lock

WORKDIR /var/www/html/wp-content/plugins/audioblog

RUN composer install --no-dev

WORKDIR /var/www/html
