export type Lighter = {
  nickname: string;
  log: Log[];
  distanceTraveled: number;
  objective: string;
  id: string;
};

export type Log = {
  nickname: string;
  when: string;
  where: {
    name: string;
    lat: number;
    lng: number;
    id: string;
    verified: boolean;
  };
  message: string;
  image: string;
};

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
export interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}

export type AutocompleteLocationProps = {
  value: PlaceType | null;
  setValue: (value: PlaceType | null) => void;
  placeholder: string;
  error: boolean;
};
