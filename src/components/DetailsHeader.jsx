import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artitstData, songData, songid }) => {
  const songDataAttributes =
    songData?.resources["shazam-songs"][songid]?.attributes;
  return (
    <div className="relative w-full flex flex-col h-96">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
      <div className="absolute inset-0 flex items-center">
        <img
          src={
            artistId
              ? artitstData?.artists[artistId].attributes?.artwork?.url
                  .replace("{w}", "500")
                  .replace("{h}", "500")
              : songDataAttributes?.images?.coverArt
          }
          width={500}
          height={500}
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full border-2 object-cover shadow-xl shadow-black"
          alt="art"
        />
        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId ? artitstData : songDataAttributes?.title}
          </p>
          {!artistId && (
            <Link
              to={`/artists/${songData?.resources["shazam-songs"][songid]?.relationships?.artists?.data[0].id}`}
            >
              <p className="text-base text-gray-400 mt-2">
                {songDataAttributes?.artist}
              </p>
            </Link>
          )}
          <p className="text-base text-gray-400 mt-2">
            {artistId ? artitstData : songDataAttributes?.genres?.primary}
          </p>
        </div>
      </div>
      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};

export default DetailsHeader;
