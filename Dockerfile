# build stage
FROM node:16.3.0-alpine3.13 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG REACT_APP_BE_HOST="https://be.itcheatsheet.com"

RUN npm run build

# production stage
FROM nginx:1.21.3-alpine as production-stage
# RUN printf "server {\n  location / {\n    root /usr/share/nginx/html;\n    try_files \$uri \$uri/ /index.html;\n  }\n}\n" > /etc/nginx/conf.d/default.conf
# ARG NGINX_MAX_BODY_SIZE="200M"
# RUN sed -i '$ s/}/\n  client_max_body_size '"$NGINX_MAX_BODY_SIZE"';\n}/' /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
COPY  ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 3001
CMD ["nginx", "-g", "daemon off;"]