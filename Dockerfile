FROM ubuntu
LABEL maintainer="Josiah Bruner"

ENV SHELL /bin/bash


RUN ["apt-get", "update", "-y"]

RUN ["apt-get", "install", "git", "-y"]

RUN ["git", "clone", "https://github.com/JosiahOne/thunderbird-clone.git"]

RUN ["apt-get", "install", "python", "-y"]


WORKDIR thunderbird-clone

RUN ["/bin/bash", "bootstrap.sh"]

RUN ["/bin/bash", "build.sh"]
