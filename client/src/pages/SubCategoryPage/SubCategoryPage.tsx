import { useEffect, useState } from "react";
import SubCategoryCard from "../../components/SubCategoryCard/SubCategoryCard";
import axios from "axios";

const SubCategoryPage = (props: any) => {
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4000/api/subCategories")
            .then((res) => {
                setSubCategories(res.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    console.log(subCategories);

    return (
        <div>
            <h1>{props.category}</h1>
            {subCategories.map(
                (subCategory: any) =>
                    subCategory.Category === props.categoryId && (
                        <div key={subCategory._id}>
                            <SubCategoryCard
                                subCategory={subCategory.name}
                                category={props.category}
                            />
                        </div>
                    )
            )}
        </div>
    );
};

export default SubCategoryPage;
