# AltV Roleplay Save Position Script

This TypeScript script for AltV Roleplay servers allows players to save their current position in the game with a command and return to it later. The positions are stored in an SQL database, allowing for persistent storage across server restarts.

## Features

- Save current player position in the game.
- Teleport back to the saved position at any time.
- Persistent storage of positions using an SQL database.

## Prerequisites

Before installing the script, make sure your server meets the following requirements:

- AltV Server is set up and running.
- Node.js and npm are installed.
- TypeScript is installed globally (`npm install -g typescript`).
- A MySQL or MariaDB database is set up and accessible.
- `mysql2` npm package is installed for database interaction.

## Installation

1. Clone the repository or download the source code.
```bash
git clone https://github.com/30Msearchtime/altv-save-position-script.git
```
2. Navigate to the script directory.
```bash
cd altv-save-position-script
```
3. Install required npm packages.
```bash
npm install
```
4. Compile TypeScript files.
```bash
tsc
```
4. Copy the compiled JavaScript files from the `dist` folder to the respective `resources` folder on your AltV server.


5. Copy the compiled JavaScript files from the `dist` folder to the respective `resources` folder on your AltV server.

6. Execute the `create_player_positions_table.sql` script on your database to create the required table for storing player positions.

7. Configure your database connection by editing `config.json` with your database details.

## Usage

Players can use the following chat commands in the game:

- Type `/savepos` in the chat to save the current position.
- Type `/loadpos` in the chat to teleport back to the saved position.

The positions are stored in the configured SQL database, making them persistent across server restarts.

## Database Setup

Ensure your database is set up and accessible. You need to execute the SQL script found in `create_player_positions_table.sql` to create the necessary table for this script.

## Configuring Database Connection

Edit the `config.json` file in the root directory of the project to include your database connection details:

```json
{
"database": {
 "host": "your_db_host",
 "user": "your_db_user",
 "password": "your_db_password",
 "database": "your_db_name"
}
}
```
- Note: It's important to not commit your config.json file with real credentials to version control for security reasons. Add config.json to your .gitignore file.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/30Msearchtime/altv-save-position-script/issues).

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

30Msearchtime - [Discord](https://discord.com/users/426081591832346624) - toolbotsystem@gmail.com

AltV Roleplay Save Position Script - [Project Link](https://github.com/30Msearchtime/altv-save-position-script)
