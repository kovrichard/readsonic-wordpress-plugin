FROM wordpress:6.3.0-apache

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer
