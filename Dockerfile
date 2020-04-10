FROM node:12.16.1

# install simple http server for serving static content
#RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app
COPY package*.json ./

# copy both 'package.json' and 'package-lock.json' (if available)
#COPY package*.json ./

# install project dependencies leaving out dev dependencies
RUN npm install --production

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .
VOLUME [ "/app" ]

# build app for production with minification
# RUN npm run build
ENV PORT=3000

EXPOSE 3000
CMD [ "npm", "start" ]