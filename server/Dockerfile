# Use official Node.js 18 LTS image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose port 5000 (as defined in server.js)
EXPOSE 5000

# Command to run the application
CMD ["npm", "run", "dev"]