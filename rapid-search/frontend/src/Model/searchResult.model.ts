export interface MusicRecordDTO {
  albumName?: string;
  artistNames?: string[];
  collectionType?: number;
  externalId: string;
  followers?: null;
  imageUrl: string;
  itemCount?: null;
  name: string;
  duration?: number;
  previewUrl?: string;
  isrc?: string;
  url: string;
}

export interface SearchResultDTO {
  data: MusicRecordDTO;
  source: string;
  status: string;
  type: string;
}
