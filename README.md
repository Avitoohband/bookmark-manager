# 🔖 MCP Bookmark Manager

A modern bookmark management application built with Next.js that doubles as a Model Context Protocol (MCP) server, providing AI assistants with bookmark management capabilities.

## ✨ Features

### Web Application
- 🔐 **Secure Authentication** - Powered by Clerk for user management
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- ⚡ **Real-time Updates** - Instant bookmark management with optimistic updates
- 🗂️ **Organized Storage** - SQLite database with Prisma ORM
- 🎨 **Modern UI** - Clean, intuitive interface with loading states and error handling

### MCP Server Capabilities
- 🤖 **AI Integration** - Provides bookmark management tools to AI assistants
- 🔌 **MCP Protocol** - Full Model Context Protocol server implementation
- 🛡️ **Authenticated Access** - Secure OAuth-protected MCP endpoints
- 📊 **Tool Exposure** - Exposes bookmark CRUD operations as MCP tools

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- A Clerk account for authentication

### Installation

1. **Clone and install dependencies:**
```bash
git clone <your-repo-url>
cd bookmark-manager
npm install
```

2. **Set up environment variables:**
Create a `.env.local` file in the root directory:
```env
# Database
DATABASE_URL="file:./prisma/dev.db"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

3. **Set up the database:**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) View your data with Prisma Studio
npx prisma studio
```

4. **Start the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🔧 Technology Stack

- **Framework:** Next.js 15.5.3 with App Router
- **Language:** TypeScript
- **Database:** SQLite with Prisma ORM
- **Authentication:** Clerk
- **Styling:** CSS Modules
- **MCP Integration:** @vercel/mcp-adapter, @clerk/mcp-tools

## 📁 Project Structure

```
bookmark-manager/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Database migrations
│   └── dev.db                # SQLite database file
├── src/
│   ├── app/
│   │   ├── api/bookmarks/     # REST API endpoints
│   │   ├── [transport]/       # MCP server endpoint
│   │   ├── .well-known/       # OAuth discovery endpoints
│   │   ├── layout.tsx         # Root layout with Clerk
│   │   └── page.tsx          # Main application page
│   ├── components/
│   │   ├── BookmarkForm.tsx   # Add/edit bookmark form
│   │   ├── BookmarkList.tsx   # Display bookmarks list
│   │   └── BookmarkCard.tsx   # Individual bookmark item
│   ├── hooks/
│   │   └── useBookmarks.ts    # Custom hook for bookmark operations
│   ├── lib/
│   │   └── bookmark-utils.ts  # Database operations
│   ├── types/
│   │   └── bookmark.ts        # TypeScript type definitions
│   └── generated/prisma/      # Generated Prisma client
└── package.json
```

## 🤖 MCP Server Integration

This application serves as an MCP server, exposing bookmark management capabilities to AI assistants.

### MCP Configuration

Add to your MCP client configuration (e.g., `~/.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "bookmark-manager": {
      "url": "http://localhost:3000/mcp"
    }
  }
}
```

### Available MCP Tools

#### `get-user-bookmarks`
Retrieves all bookmarks for the authenticated user.

**Parameters:** None

**Returns:** Array of bookmark objects

#### `create-bookmark`
Creates a new bookmark for the authenticated user.

**Parameters:**
- `url` (string, required): The bookmark URL
- `title` (string, required): The bookmark title
- `notes` (string, optional): Additional notes

**Returns:** Created bookmark object

### Authentication

MCP endpoints are protected by OAuth. The server uses Clerk for authentication and requires valid OAuth tokens for MCP tool access.

## 🛠️ API Endpoints

### REST API

#### `GET /api/bookmarks`
Fetch all bookmarks for the authenticated user.

#### `POST /api/bookmarks`
Create a new bookmark.

**Body:**
```json
{
  "url": "https://example.com",
  "title": "Example Site",
  "notes": "Optional notes"
}
```

#### `DELETE /api/bookmarks/[id]`
Delete a specific bookmark by ID.

### MCP Endpoints

#### `GET/POST /[transport]`
MCP server endpoint supporting multiple transport protocols.

#### `GET /.well-known/oauth-authorization-server`
OAuth authorization server discovery endpoint.

#### `GET /.well-known/oauth-protected-resource`
OAuth protected resource discovery endpoint.

## 🗄️ Database Schema

```sql
model Bookmark {
  id        String   @id @default(cuid())
  url       String
  title     String
  notes     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userId    String   // Clerk user ID
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed on any platform that supports Next.js applications:
- Netlify
- Railway
- Render
- Self-hosted with Docker

## 🧪 Development

### Available Scripts

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Open Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset

# Generate Prisma client
npx prisma generate
```

### Adding New Features

1. **Database Changes:** Update `prisma/schema.prisma` and run migrations
2. **API Endpoints:** Add new routes in `src/app/api/`
3. **MCP Tools:** Extend the MCP handler in `src/app/[transport]/route.ts`
4. **UI Components:** Create new components in `src/components/`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Clerk](https://clerk.com/) - Authentication platform
- [Prisma](https://prisma.io/) - Database toolkit
- [Vercel](https://vercel.com/) - MCP adapter and hosting platform

---

**Built with ❤️ using Next.js and the Model Context Protocol**