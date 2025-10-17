# alt:V Save Position Script (v2.0) 🚀

> ✨ **Fully updated and modernized!** This version features TypeScript 5.6, alt:V JavaScript v2 API, connection pooling, and production-ready architecture.

A modern, type-safe TypeScript script for alt:V multiplayer servers that allows players to save and load their positions with persistent MySQL storage and smooth transitions.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![alt:V](https://img.shields.io/badge/alt:V-JS%20v2-blue)](https://altv.mp)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)

---

## ✨ Features

- 💾 **Persistent Storage**: MySQL database with optimized connection pooling
- 🔒 **Type-Safe**: Full TypeScript support with alt:V types v16
- ⚡ **Modern Async/Await**: Non-blocking database operations for better performance
- 🛡️ **Comprehensive Error Handling**: Validation, error messages, and graceful degradation
- 🎨 **Enhanced User Experience**: Color-coded notifications and smooth screen transitions
- 🔧 **Environment-Based Configuration**: Secure credential management with `.env` files
- 📦 **Production Ready**: Connection pooling, keep-alive, and graceful shutdown support
- 🏗️ **Clean Architecture**: Separated client/server/shared code structure
- 🔄 **UPSERT Logic**: Automatic insert or update of player positions
- 📊 **Debug Mode**: Optional logging for development and troubleshooting

---

## 📋 Prerequisites

Before installing the script, ensure your server meets these requirements:

- **alt:V Server** (latest stable version)
- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **TypeScript** 5.6+ (installed via npm)
- **MySQL** 5.7+ or **MariaDB** 10.3+
- **Database access** with CREATE TABLE privileges

---

## 🚀 Installation

### Step 1: Clone the Repository

```
git clone https://github.com/30Msearchtime/altv-save-position-script.git
cd altv-save-position-script
```

### Step 2: Install Dependencies

```
npm install
```

This will install all required packages including:
- `@altv/types-server` & `@altv/types-client` (v16)
- `mysql2` (v3.11+)
- `dotenv` (v16.4+)
- `typescript` (v5.6+)

### Step 3: Configure Environment Variables

Copy the example environment file and edit with your database credentials:

```
cp .env.example .env
```

Edit `.env` with your actual database details:

```
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=altv_server

# Connection Pool Settings
DB_CONNECTION_LIMIT=10
DB_QUEUE_LIMIT=0

# Server Configuration
DEBUG_MODE=false
```

> ⚠️ **Important:** Never commit your `.env` file to version control! It's already included in `.gitignore`.

### Step 4: Set Up Database

Execute the SQL script to create the required table:

**Option A - Command Line:**
```
mysql -u your_username -p < create_player_positions_table.sql
```

**Option B - MySQL Workbench/phpMyAdmin:**
- Open your MySQL client
- Copy and paste the contents of `create_player_positions_table.sql`
- Execute the query

### Step 5: Compile TypeScript

Compile the TypeScript source files to JavaScript:

```
npm run build
```

This creates the `dist/` folder with compiled JavaScript files.

### Step 6: Deploy to Server

Copy the necessary files to your alt:V server's resources folder:

```
# Create resource folder
mkdir -p /path/to/altv-server/resources/savepos

# Copy compiled files
cp -r dist/* /path/to/altv-server/resources/savepos/

# Copy configuration files
cp resource.toml /path/to/altv-server/resources/savepos/
cp .env /path/to/altv-server/resources/savepos/

# Copy node_modules if needed (optional)
cp -r node_modules /path/to/altv-server/resources/savepos/
```

### Step 7: Enable Resource

Add the resource to your `server.toml` configuration:

```
resources = [
    # ... your other resources
    "savepos"
]
```

### Step 8: Start Server

Start or restart your alt:V server. You should see initialization messages in the console:

```
[Config] Configuration loaded successfully
[Database] Connection pool initialized successfully
[SavePosition] Resource initialized successfully
```

...

## 👤 Author

**30Msearchtime**

- GitHub: [@30Msearchtime](https://github.com/30Msearchtime)
- Discord: [426081591832346624](https://discord.com/users/426081591832346624)
- Email: toolbotsystem@gmail.com
