import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductPageSkeleton = () => {
    return (
        <>
            <Skeleton
                style={{ marginTop: "10px" }}
                height={340}
                width={340}
                borderRadius={25}
            />
            <Skeleton
                style={{ marginTop: "7.5px", marginBottom: "5px" }}
                height={60}
                width={340}
                borderRadius={20}
            />
            <Skeleton
                style={{ marginTop: "5px" }}
                height={20}
                width={340}
                borderRadius={7.5}
                count={8}
            />
        </>
    );
};

export default ProductPageSkeleton;
