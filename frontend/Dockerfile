FROM ubuntu:18.04 AS setup

# Update
RUN apt-get update && apt-get upgrade -y

# Install node
RUN apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_10.x | bash && \
    apt-get install -y nodejs

# Install yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

# Install angular CLI globally
RUN yarn global add @angular/cli

# Add start script
RUN apt-get install -y dos2unix
COPY develop-in-docker.sh /init.sh
RUN dos2unix /init.sh && \
    chmod +x /init.sh

# Working environment
FROM setup AS environment
WORKDIR /src
ENTRYPOINT [ "/bin/bash", "/init.sh" ]

