import { PostAdDto } from "../../../services/api/models";
import { Advertisement } from "../../organisms/advertisement";

type AdvertisementsProps = {
  data: PostAdDto[];
};

export function Advertisements({ data: ads }: AdvertisementsProps) {
  return (
    <>
      {ads.map(ad => (
        <Advertisement key={ad.id} data={ad}/>
      ))}
    </>
  );
}
