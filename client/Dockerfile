FROM node:alpine

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
#COPY package*.json ./
# Copy the rest of the application
COPY . .

RUN npm install

# Build the app
RUN npm run build

EXPOSE 5174

CMD ["npm", "run", "dev"]
