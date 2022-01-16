<!-- ABOUT THE PROJECT -->

## About The Project

The task was interesting for me, because i worked with this type of task for the first time.

Since this is the first experience, I took React as a basis and decided to do everything on hooks.

All this works on create-react-app. On this project, you can simply start.

The architecture is simple - we have blocks, we can move them,
we can also change their size, we can delete them, all these actions work through 3 listeners (mouseup, mousedown, mousemove).
Also, every time we create a note, we generate a random color, which is predetermined for a better combination of palettes.
All this is stored in local storage.

There are problems that I ran into:

- Moving the notes - calculating the current position
- Synchronization of all our notes to local storage - a single note

<!-- GETTING STARTED -->

## Getting Started

- npm
  ```sh
  npm install
  npm run start
  ```