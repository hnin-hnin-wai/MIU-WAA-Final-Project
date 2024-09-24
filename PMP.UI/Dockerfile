# Use a base image with Node.js installed
FROM node AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Build the React application
RUN npm run build

# Use a lightweight base image to serve the React application
FROM nginx:alpine


# Copy the built React application from the previous stage to the NGINX server directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 to allow external access to the React application
EXPOSE 80

# Start NGINX server to serve the React application
CMD ["nginx", "-g", "daemon off;"]
