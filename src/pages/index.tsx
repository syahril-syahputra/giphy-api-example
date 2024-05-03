import GridContainer from "@/components/GridContainer";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

import ResizeObserver from "react-resize-observer";

export default function Home() {
    const [searchQuery, setSearcheQuery] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const checkTextChange = () => {
            timeoutId = setTimeout(() => {
                setSearchValue(searchQuery);
            }, 500);
        };
        checkTextChange();
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);
    return (
        <div className="space-y-8">
            <div className="header">
                <Input
                    value={searchQuery}
                    onChange={(e) => setSearcheQuery(e.target.value)}
                    className="search"
                    type="text"
                    placeholder="Search"
                />
            </div>
            <GridContainer
                searchQuery={searchValue}
                searched={searchValue !== ""}
                width={width}
                height={height}
            />
            <ResizeObserver
                onResize={({ width, height }) => {
                    setWidth(width - 40);
                    setHeight(height);
                }}
            />
        </div>
    );
}
