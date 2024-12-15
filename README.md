# Inside My Closet

A Progressive Web App (PWA) for digital wardrobe management, helping users make the most of their existing clothes.

## Features

- 📱 **Progressive Web App (PWA)** - Install on any device
- 🎨 **Clean, modern UI** with Inter font
- 🔄 **Automatic updates**
- 📦 **Offline capability**
- 🌐 **Cross-platform compatibility**

## Tech Stack

- React 18
- TypeScript
- Vite
- Native Base
- React Router DOM
- PWA (Vite PWA Plugin)

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/fac30/inside-my-closet.git
   cd inside-my-closet
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Building for Production

```bash
npm run build
# or
yarn build
### Contributing:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
### License:
This project is licensed under the Unlicense - see the LICENSE file for details.

---

### Acknowledgments:
- **Font**: Inter by Google Fonts
- **Icons**: Heroicons

## Eco-Advice Page Configuration

### Google Docs Integration

The eco-advice articles are dynamically rendered from Google Docs. To set up new articles:

1. Create your article in Google Docs
2. Set sharing permissions:
   - Click 'Share' in the top right
   - Select 'Publish to web'
   - Enable auto-republish option
   - Copy the published URL

### Article Component Setup

Each article is rendered using the `parseDoc` function. To add or modify articles:

1. Locate the article component in the codebase
2. Find the `parseDoc` function
3. Insert the published Google Docs URL:
   ```javascript
   parseDoc('YOUR_PUBLISHED_GOOGLE_DOC_URL_HERE')
   ```

### OpenAI Configuration

The eco-advice page interfaces with OpenAI's API for additional functionality:

1. Navigate to `utils/openai.js`
2. On line 11, update the OpenAI endpoint URL:
   ```javascript
   const OPENAI_API_ENDPOINT = 'YOUR_OPENAI_ENDPOINT_URL'
   ```

### Important Notes

- Ensure all Google Docs are set to auto-publish to maintain current content
- Only use published sharing links from authorised product owners
- Keep OpenAI endpoint URLs secure and never commit them directly to the repository
- Consider using environment variables for sensitive URLs and endpoints
```
