# Photo Gallery

A React + Vite + Tailwind CSS app that fetches 30 photos from the [Picsum Photos API](https://picsum.photos/), shows them in a responsive grid, filters them by author name, and lets you mark favourites.

## Run locally

```bash
npm install
npm run dev
```

## Structure

| File | Purpose |
| --- | --- |
| `src/hooks/useFetchPhotos.js` | Custom hook that fetches the photos and returns `{ photos, loading, error }` |
| `src/reducers/favouritesReducer.js` | Favourites reducer (`TOGGLE_FAVOURITE`) and the localStorage load/save helpers |
| `src/components/Gallery.jsx` | Search input, loading and error states, grid; uses `useReducer`, `useCallback`, `useMemo` |
| `src/components/PhotoCard.jsx` | One card with the photo, the author name and a heart button |

## Requirements covered

1. React + Vite with Tailwind CSS v4. No UI libraries.
2. Fetches photos on load, with a loading spinner and an error message.
3. Grid with 1 column on mobile, 2 on tablet (`md`) and 4 on desktop (`lg`).
4. Real-time search by author that filters the photos already fetched. No extra API calls.
5. Favourites are managed with `useReducer` and saved to `localStorage`.
6. The fetch logic lives in the `useFetchPhotos` hook.
7. `useCallback` wraps the search handler and `useMemo` computes the filtered list.
