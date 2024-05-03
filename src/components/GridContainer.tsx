import { useEffect, useState } from "react";
import { Grid } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";

interface IProps {
    searchQuery: string;
    searched: boolean;
    width: number;
    height: number;
}
function GridContainer({ searchQuery, searched, width, height }: IProps) {
    const [fetched, setFetched] = useState(false);
    const giphyFetch = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);

    function trendingGifs() {
        return giphyFetch.trending({ limit: 20 });
    }

    function searchGifs() {
        return giphyFetch.search(searchQuery, { limit: 20 });
    }
    useEffect(() => {
        setFetched(false);
        searched
            ? searchGifs().then(() => {
                  setFetched(true);
              })
            : trendingGifs().then(() => {
                  setFetched(true);
              });
    }, [searched, searchQuery]);

    return fetched ? (
        <div className="h-full w-full">
            {!searched ? (
                <Grid
                    fetchGifs={trendingGifs}
                    width={height > width || width < 728 ? width : width / 2}
                    columns={3}
                    gutter={6}
                />
            ) : (
                <Grid
                    fetchGifs={searchGifs}
                    width={height > width || width < 728 ? width : width / 2}
                    columns={3}
                    gutter={6}
                />
            )}
        </div>
    ) : (
        <div className="loader">Loading...</div>
    );
}

export default GridContainer;
