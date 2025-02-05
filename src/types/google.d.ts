declare global {
  interface Window {
    google: typeof google;
  }
}

declare namespace google.maps {
  interface PlacesLibrary {
    Autocomplete: typeof google.maps.places.Autocomplete;
  }
}

export {};