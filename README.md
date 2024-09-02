# ChatGram

ChatGram is a social networking platform that allows users to chat, share posts, and connect with friends in real-time. The application is built using Java Spring for the backend, React for the frontend, and utilizes PostgreSQL as the database. It also features JWT authorization for secure user authentication and WebSocket for real-time messaging. If a user forgets their password, they can reset it through an email link sent by the server, ensuring enhanced security.

## Features

- **User Authentication:** Secure authentication using JWT (JSON Web Tokens).
- **Password Reset:** Users can reset their passwords via a secure email link.
- **Real-Time Chat:** Instant messaging through WebSocket.
- **Post Management:** Create, read, update, and delete posts.
- **Friend Connections:** Connect with other users and manage your friend list.
- **Responsive Design:** Fully responsive design for an optimal user experience on all devices.

## Tech Stack

- **Backend:** Java Spring
- **Frontend:** JavaScript (React)
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Real-Time Communication:** WebSocket

## Installation

### Prerequisites

- Java 11 or later
- Node.js and npm
- PostgreSQL
- Docker

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/Amansdfg/JWT.git
    ```
2. Configure the PostgreSQL database in `application.properties` or `application.yml`:
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/chatgram
    spring.datasource.username=your_username
    spring.datasource.password.svg=your_password
    spring.jpa.hibernate.ddl-auto=update
    ```
3. Run the backend:
    ```bash
    ./gradlew bootRun
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm start
    ```

### Running with Docker (Optional)

1. Build and run the containers:
    ```bash
    docker-compose start
    docker-compose up
    ```

## Usage

- Register a new account or log in with an existing account.
- Add friends and start chatting in real-time.
- Share posts and view posts from your friends.
- Reset your password securely if forgotten.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
