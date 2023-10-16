<p align="center"><img width=12.5% src="https://github.com/camzero94/ChatWebRoom/blob/main/media/fruit-salad.png"></p>
<p align="center"><img width=60% src="https://github.com/camzero94/ChatWebRoom/blob/main/media/Title.jpg"></p>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

![Go](https://img.shields.io/badge/golang-v1.23+-blue.svg)
![Typescript ](https://img.shields.io/badge/typescript-v4.4+-blue.svg)
![Postgres](https://img.shields.io/badge/postgres-v12.0+-purple.svg)
![Docker](https://img.shields.io/badge/docker-v21+-purple.svg)
![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)

## Basic Overview

Chat room website application that allow users to connect in private and customizable rooms. All messages are encrypted using wss protocol (Web Socket Secure).

## Framework Overview
<p align ="center"><img src="https://github.com/camzero94/ChatWebRoom/blob/main/media/ChatRoom.png" width=60%></p>

- Sign up and login to the main room and create your custom room via https request to the API endpoint.
- Join room via wss protocol to any of the aviable rooms created in the hub.
<br>

## Design 
<p align="center"><img src="https://github.com/camzero94/ChatWebRoom/blob/main/media/Arch_chatroom.png" width=60%></p>

- A hub is atuatically created, this is where the rooms will be hosted.
- Every room can have multiple clients and every client can have multiple rooms.
- Only clients inside the same room will be able to communicate each other via websocket.
- A **background go rutine** is always running waiting for a message from the client to execute **register** , **unregister** or **broadcast** actions.
- The **writeMessage()** and **readMessage()** functions will read and write to and from the socket connection. 
<br>

## Features

* Easy to connect and exchange messages between friends.
* Messages encrypetd via wss.
* So far all rooms are public.

## Live Demo 

- Please visit room.camzerocol.com/signUp 

## Pending Features
- In future plans add more features such as private rooms, level permissions for users (admin, users,etc),  add layer when websockets broken.
