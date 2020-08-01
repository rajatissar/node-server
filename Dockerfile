FROM node:10
# Create app directory
WORKDIR /node-server
# Install app dependencies
COPY package.json /node-server
RUN npm install
# Copy app source code
COPY . .
#Expose port and start application
EXPOSE 1415
CMD ["npm" ,"start"]