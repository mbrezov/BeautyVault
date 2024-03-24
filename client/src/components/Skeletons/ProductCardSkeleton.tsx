import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ProductCardSkeleton = () => {
    return (
        <div>
            <Skeleton height={80} width={340} borderRadius={25} />
        </div>
    );
};
