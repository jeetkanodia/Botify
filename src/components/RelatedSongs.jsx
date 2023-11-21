import SongBar from "./SongBar";
import { useState, useEffect } from "react";
const RelatedSongs = ({
  data,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  relatedTrackID,
  artistId,
}) => {
  const [relatedSongData, setRelatedSongData] = useState(null);

  useEffect(() => {
    if (data) {
      console.log(data);
      const tempRelatedSongData =
        data?.resources?.["shazam-song-lists"][relatedTrackID]?.[
          "relationships"
        ]?.["tracks"]?.["data"];
      const tempRelatedSongData2 = [];
      for (let i = 0; i < tempRelatedSongData.length; i++) {
        const songid = tempRelatedSongData[i].id;
        const songData = data?.resources?.["shazam-songs"][songid];
        tempRelatedSongData2.push(songData);
      }
      setRelatedSongData(tempRelatedSongData2);
      console.log(tempRelatedSongData2);
    }
  }, [data]);

  return (
    <div className="flex flex-col ">
      <h1 className="font-bold  text-white text-3xl">Related Songs:</h1>
      <div className="mt-6 w-full flex flex-col ">
        {relatedSongData?.map((song, i) => (
          <SongBar
            key={`${song.id}-${artistId}`}
            song={song.attributes}
            i={i}
            songId={song.id}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
