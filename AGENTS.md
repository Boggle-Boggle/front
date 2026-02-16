AI Coding Agent & Collaboration Guidelines
Purpose
This document defines the standard code conventions and architectural rules for this project. All AI agents and collaborators must strictly adhere to these guidelines.

Tech Stack
Framework: React (Functional Components only)

Language: TypeScript (Strict mode)

Server State: Tanstack Query (React Query)

Global State: Zustand (Minimal usage)

Styling: Tailwind CSS

Forms & Validation: React Hook Form, Zod

Directory Structure (Page-based)

1. Page as the Default Unit
   The basic structure is page-based.

Every page must be created as a folder.

Sub-routes must be created as folders within the parent page folder, maintaining a nested structure.

The routing hierarchy and folder structure must always match.

Non-page units (Sections, Flows, Steps, Tabs) can also be folders if the UI/functional unit is distinct.

2. Folder Naming & Entry File
   Folder names use PascalCase (based on the component/page name).

The entry file for any folder must be index.tsx.

Example: src/pages/OrderDetail/index.tsx

3. Page-local Reuse (Scoped Sharing)
   Components or logic used only within a specific page/folder should not be moved to the global scope.

Manage these within a shared/ directory inside that specific folder.

Example: src/pages/OrderDetail/shared/\*

4. Global Modules Placement
   Global State: src/stores

Utilities: src/utils

Global Hooks: src/hooks

Global Components: src/components

Component Rules

1. Component Declaration
   All components must be declared using arrow functions.

Allowed:

TypeScript
export const BookCard = () => {
return <div />;
}; 2. File & Folder Naming
Use PascalCase for component names.

Components are managed as folders. The folder name is the component name, containing an index.tsx.

3. Props Type Declaration
   Use type for prop definitions (not interface).

Naming convention: [ComponentName]Props.

Destructure props at the top level of the component body.

Allowed:

TypeScript
type BookCardProps = {
title: string;
author: string;
};

export const BookCard = (props: BookCardProps) => {
const { title, author } = props;
return <div>{title}</div>;
}; 4. Conditional Rendering
Return null explicitly for conditional rendering when nothing should be shown.

5. Handler Declaration
   All event handlers must be declared separately from the JSX.

For single-line logic, use direct references.

6. Named Export Only
   Use named exports for all components. Default exports are prohibited.

7. Component Responsibility
   Components handle UI only.

Data processing and business logic must be abstracted into custom hooks.

Forbidden: Fetching or processing raw data directly inside the component body.

State Management Rules

1. Server State Fetching
   Use TanStack Query for all server data fetching. useEffect + fetch is prohibited.

Define queries in a custom hook in the same directory level (or shared/).

2. Query Key Rules
   queryKey must be an Array.

Structure: [Resource Name, Identifier/Parameter].

Order: Static String → Dynamic Value.

3. Server State Update (Mutation)
   Use useMutation for updates.

Invalidate relevant queries in the onSuccess callback to sync the cache.

4. Zustand Usage
   Minimize Zustand usage.

Always ask the user for permission before implementing a new Zustand store.

Use Zustand only for global UI states.

5. Local State Typing
   Always provide Generics when using useState.

Example: const [count, setCount] = useState<number>(0);

6. Memoization
   Always ask the user for permission before using useMemo or useCallback. Do not over-optimize prematurely.

7. Form Management
   Always ask the user for permission before implementing React Hook Form + Zod.

Code Ordering
Inside a Component:
State & Refs: useState, useRef, useContext, etc.

Data & Effects: useQuery, useMutation, useEffect.

Memoization: useMemo, useCallback.

Logic: Event handlers, internal helper functions.

Render: JSX return statement.

Inside a File:
Imports

Interfaces/Types

Constants (Consider i18n support)

Main Component (Named Export)

Sub-components (Internal use only)

External Utility Functions
