# Design Decisions and Thoughts

# For Frontend:

Project Structure
`src` -|
     `component`
          -| 
           `CardBlock.tsx`(Represents card)
           `LoadingSpinner.tsx`(Loads spinner till API returns data)
           `SearchBar.tsx`(Search component for user to make search query)
     `pages`
          -|
           `CardsPage.tsx`(Renders a list of cards)
           `SearchCard.tsx`(Base structure for SearchBar component)
     `services`
          -|
           `CardService.tsx`(Calls API using axios)
     `types`
          -|
           `MagicCard.ts`(Data transfer object for card)
     `styles`
          -|
           `card.css` (Apply Tailwind CSS classes for card)
     `App.tsx`
`tailwind.config.js`
`postcss.config.js`
`tsconfig.json`
`vite.config.ts`

# For Backend:

Project Strucutre

prisma` -|
          `schema.prisma`
`src` -|
     `routes`
          -|
           `magiccards.route.ts`(Defines route mappings between URLs and controller methods.)
     `controllers`
          -| 
           `magiccards.controller.ts` (Contains controller modules that handle incoming HTTP requests and return responses.)
     `model`
          -| 
           `magiccards.model.ts` (Includes data models representing database tables or entities.)
     `service`
          -| 
           `magiccards.service.ts` (Service modules responsible for business logic and data manipulation.)   
     `index.ts`
.env (Environment variables file for storing sensitive or environment-specific configurations.)
.gitignore (Specifies which files and directories to ignore in version control.)
`tsconfig.json`

# Database:

- Used Prisma Raw query for interacting with given database.