import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const SubcategoryCardSkeleton = ({ cards }: { cards: number }) => {
    return (
        <div>
            {Array(cards)
                .fill(0)
                .map((_, index) => (
                    <div key={index}>
                        <Skeleton height={80} width={340} borderRadius={25} />
                    </div>
                ))}
        </div>
    );
};
