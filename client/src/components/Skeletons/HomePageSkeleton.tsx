import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HomePageSkeleton = () => {
    return (
        <div>
            <Skeleton
                width={180}
                height={35}
                borderRadius={12}
                style={{ marginTop: "30px", marginBottom: "20px" }}
            />
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gridTemplateRows: "repeat(3, 1fr)",
                    gap: "25px",
                }}
            >
                {Array(7)
                    .fill(0)
                    .map((_, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                                width: "150px",
                                height: "180px",
                                borderRadius: "20px",
                                background: "rgba(154, 172, 159, 0.9)",
                            }}
                        >
                            <Skeleton
                                height={50}
                                width={50}
                                borderRadius={10}
                                style={{ marginTop: "30px" }}
                            />
                            <Skeleton
                                height={30}
                                width={120}
                                borderRadius={10}
                                style={{ marginTop: "20px" }}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default HomePageSkeleton;
