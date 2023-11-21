import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazamCore";

const SongDetails = () => {
  const [lyricData, setLyricData] = useState([]);
  const [lyricid, setLyricid] = useState(null);
  const [relatedtrackid, setRelatedtrackid] = useState(null);
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });

  const {
    data,
    isFetching: isFetchingRelatedSongs,
    error,
  } = useGetSongRelatedQuery({ relatedtrackid });

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, i, data }));
    dispatch(playPause(true));
  };
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  useEffect(() => {
    if (songData) {
      const relatedTrackID =
        songData?.resources["shazam-songs"][songid]?.["relationships"]?.[
          "related-tracks"
        ]?.["data"][0]?.["id"];
      setRelatedtrackid(relatedTrackID);

      const lyricID =
        songData?.resources["shazam-songs"][songid]?.["relationships"]?.[
          "lyrics"
        ]?.["data"]?.[0]?.["id"];

      if (lyricID) {
        setLyricid(lyricID);

        const LyricData =
          songData?.resources["lyrics"][lyricID]?.["attributes"]?.["text"];
        setLyricData(LyricData);
      }
    }
  }, [songid, songData]);

  console.log(data);

  if (isFetchingSongDetails || isFetchingRelatedSongs)
    return <Loader title={"Searching Song Details"} />;
  return (
    <div className="flex flex-col">
      <DetailsHeader songData={songData} songid={songid} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {lyricData ? (
            lyricData.map((line, i) => (
              <p className="text-gray-400 text-base my-1" key={i}>
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">Lyrics not found</p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
