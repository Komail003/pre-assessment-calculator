# Use the official Node.js image as the base image
FROM node:20.16.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN npm i sharp

# Build the Next.js application
# RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
