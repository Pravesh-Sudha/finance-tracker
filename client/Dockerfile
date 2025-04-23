# Use official Node.js 18 LTS image for building
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight server for serving the build
FROM node:18-alpine

# Install serve globally
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy build output from the build stage
COPY --from=build /app/build ./build

# Expose port 3000
EXPOSE 3000

# Command to serve the app
CMD ["serve", "-s", "build", "-l", "3000"]