import { useEffect, useState } from "react";
import SubCategoryCard from "../../components/SubCategoryCard/SubCategoryCard";
import axios from "axios";
import { useParams } from "react-router-dom";

const SubCategoryPage = (props: any) => {
    const [subcategories, setSubcategories] = useState([]);
    const [newSubcategory, setnewSubcategory] = useState("");
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

    /*  console.log(subcategories); */

    const addNewSubcategory = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:4000/api/category/${categoryId}/subcategory`,
                { name: newSubcategory }
            );
            console.log(response);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h1>{props.data.name}</h1>
            <form onSubmit={addNewSubcategory}>
                <input
                    type="text"
                    onChange={(e) => setnewSubcategory(e.target.value)}
                />
                <button type="submit">submit</button>
            </form>
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
