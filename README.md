# React + TypeScript + Kenyanese Dev Social Network

Welcome to Kenyanese — a vibrant social networking platform built for developers, by developers! 🚀

## What is Kenyanese?
Kenyanese is a community hub where developers can:
- **Create rich profiles** with bio, skills, and links to GitHub, Wakatime, Discord, and more.
- **Share posts, projects, and resources** with the community.
- **Showcase GitHub and Wakatime stats** right on their profile.
- **Connect their Discord** for even more community engagement.
- **Upload a profile image** to personalize their presence.
- **Discover and share opportunities** — whether you’re looking for jobs, gigs, or volunteering roles.
- **Get matched with opportunities** that fit your preferences (remote, onsite, hybrid, contract, etc.).

## Why Kenyanese?
- **For Developers:** Find collaborators, showcase your work, and grow your network.
- **For Teams & Orgs:** Post jobs, gigs, and volunteer opportunities and get matched with passionate devs.
- **For Everyone:** Celebrate open source, community, and the power of connection.

## Join the Movement
Kenyanese is more than a platform — it’s a movement to empower developers to connect, build, and thrive together.

---

_Ready to join? Sign up, set up your profile, and start sharing your journey!_
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
