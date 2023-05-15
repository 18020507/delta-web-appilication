FROM nginx:1.24.0-alpine

RUN mkdir /app
COPY dist/ /app/
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /app
EXPOSE 80

