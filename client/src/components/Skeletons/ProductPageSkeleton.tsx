import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductPageSkeleton = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "350px",
                height: "590px",
                background: "rgba(154, 172, 159, 0.9)",
                borderRadius: "25px",
                marginTop: "10px",
            }}
        >
            <Skeleton
                style={{ marginTop: "10px" }}
                height={340}
                width={330}
                borderRadius={25}
            />
            <Skeleton
                style={{ marginTop: "7.5px", marginBottom: "5px" }}
                height={60}
                width={330}
                borderRadius={20}
            />
            <Skeleton
                style={{ marginTop: "5px" }}
                height={20}
                width={330}
                borderRadius={7.5}
                count={6}
            />
        </div>
    );
};

export default ProductPageSkeleton;
