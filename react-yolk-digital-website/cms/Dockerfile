FROM node:10-alpine

WORKDIR /usr/src/app/backend

RUN echo "unsafe-perm = true" >> ~/.npmrc

RUN apk add --no-cache \
  autoconf \
  automake \
  gcc \
  libc-dev \
  libtool \
  make \
  nasm \
  zlib-dev

RUN npm install -g strapi@beta

COPY . .

# COPY strapi.sh ./
RUN chmod +x ./strapi.sh

EXPOSE 1337

CMD ["./strapi.sh"]