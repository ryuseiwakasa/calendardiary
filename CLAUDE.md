# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a calendar-based diary application built with React + Vite. Users can record daily entries with text and images in a calendar interface.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Project Architecture

### Tech Stack
- **React 19**: UI library
- **Vite 7**: Build tool and dev server
- **date-fns 4**: Date manipulation and formatting
- **LocalStorage**: Data persistence

### Key Features (Simplified Requirements)
1. **Calendar View**: Monthly calendar with date selection
2. **Diary Entries**: Create, edit, delete daily entries
3. **Image Attachments**: Multiple images per entry
4. **Data Storage**: LocalStorage for persistence

### Excluded Features
The following features are intentionally **NOT** implemented:
- Tag/category system
- Search functionality
- Data export/import
- Weather/mood tracking
- IndexedDB

### Data Structure

```javascript
// Diary Entry
{
  id: string,           // Unique identifier
  date: string,         // YYYY-MM-DD format
  content: string,      // Diary text content
  images: string[],     // Base64 or Data URLs
  createdAt: Date,
  updatedAt: Date
}
```

### Directory Structure

```
src/
  components/       # React components
    Calendar/       # Calendar display and navigation
    DiaryEditor/    # Diary entry form/modal
    ImageUpload/    # Image handling components
  hooks/           # Custom React hooks
  utils/           # Utility functions (date handling, storage)
  App.jsx          # Main app component
  main.jsx         # Entry point
```

## Development Guidelines

### Phase 1: Core Features
- Calendar display with month navigation
- Basic diary CRUD operations
- LocalStorage integration

### Phase 2: Image Features
- Image upload/preview
- Image deletion
- Multiple images per entry

### Storage
All data is stored in LocalStorage under the key `diary-entries` as a JSON array.

### Date Handling
Use `date-fns` for all date operations. Common patterns:
```javascript
import { format, startOfMonth, endOfMonth } from 'date-fns';

// Format dates consistently
const dateKey = format(date, 'yyyy-MM-dd');
```

## Notes
- This is a client-side only application (no backend)
- Images are stored as Base64 strings in LocalStorage
- The app focuses on simplicity over advanced features
