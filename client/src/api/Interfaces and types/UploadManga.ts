

interface MangaImage {
    fileName: string;
    vol: string;
    ch: string;
    p: string;
  }
export interface MangaImages {
    [vol: string]: {
        [ch: string]: {
        [p: string]: MangaImage[];
        };
    };
}
