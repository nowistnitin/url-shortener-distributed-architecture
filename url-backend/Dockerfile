# Use the official Node.js image from the Docker Hub for version 18
FROM node:18
# Create and change to the app directory in the container
WORKDIR /usr/src/app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code to the working directory
COPY . .
# Expose the port that the app runs on
EXPOSE 5000
# Define the command to run the application
CMD ["npm", "run", "dev"]