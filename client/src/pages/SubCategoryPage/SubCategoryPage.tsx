import { useEffect, useState } from "react";
import SubCategoryCard from "../../components/SubCategoryCard/SubCategoryCard";
import axios from "axios";
import { useParams } from "react-router-dom";

const SubCategoryPage = (props: any) => {
    const [subcategories, setSubcategories] = useState([]);
    const { categoryId } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/category/${categoryId}/subcategory`)
            .then((res) => {
                setSubcategories(res.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, [categoryId]);

    console.log(subcategories);

    return (
        <div>
            <h1>{props.category}</h1>
            {subcategories.map((subcategory: any) => (
                <div key={subcategory._id}>
                    <SubCategoryCard
                        name={subcategory.name}
                        categoryId={categoryId}
                        subcategoryId={subcategory._id}
                    />
                </div>
            ))}
        </div>
    );
};

export default SubCategoryPage;
