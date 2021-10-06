export interface Album {
    album_type:             string;
    artists:                ArtistElement[];
    available_markets:      string[];
    copyrights:             Copyright[];
    external_ids:           AlbumExternalIDS;
    external_urls:          ExternalUrls;
    genres:                 any[];
    href:                   string;
    id:                     string;
    images:                 Image[];
    name:                   string;
    popularity:             number;
    release_date:           string;
    release_date_precision: string;
    tracks:                 Tracks;
    type:                   string;
    uri:                    string;
}

export interface ArtistElement {
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    name:          string;
    type:          string;
    uri:           string;
}

export interface ExternalUrls {
    spotify: string;
}

export interface Copyright {
    text: string;
    type: string;
}

export interface AlbumExternalIDS {
    upc: string;
}

export interface Image {
    height: number;
    url:    string;
    width:  number;
}

export interface Tracks {
    href:     string;
    items:    Track[];
    limit:    number;
    next:     null;
    offset:   number;
    previous: null;
    total:    number;
}

export interface Track {
    artists:           ArtistElement[];
    available_markets: string[];
    disc_number:       number;
    duration_ms:       number;
    explicit:          boolean;
    external_urls:     ExternalUrls;
    href:              string;
    id:                string;
    name:              string;
    preview_url:       string;
    track_number:      number;
    type:              string;
    uri:               string;
    album?:            AlbumClass;
    external_ids?:     TrackExternalIDS;
    is_local?:         boolean;
    popularity?:       number;
}

export interface AlbumClass {
    album_type:             string;
    artists:                ArtistElement[];
    available_markets:      string[];
    external_urls:          ExternalUrls;
    href:                   string;
    id:                     string;
    images:                 Image[];
    name:                   string;
    release_date:           Date;
    release_date_precision: string;
    type:                   string;
    uri:                    string;
}

export interface TrackExternalIDS {
    isrc: string;
}

export interface Artist {
    external_urls: ExternalUrls;
    followers:     Followers;
    genres:        string[];
    href:          string;
    id:            string;
    images:        Image[];
    name:          string;
    popularity:    number;
    type:          string;
    uri:           string;
}

export interface Followers {
    href:  null;
    total: number;
}
