import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SubcategoryCard from "../../components/SubcategoryCard/SubcategoryCard";
import { ISubcategory } from "../../interfaces/interface";

const SubcategoryPage = () => {
    const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
    const [newSubcategory, setnewSubcategory] = useState("");
    const { categoryId } = useParams<string>();

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

    const addNewSubcategory = async (e: React.FormEvent) => {
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
            <form onSubmit={addNewSubcategory}>
                <input
                    type="text"
                    onChange={(e) => setnewSubcategory(e.target.value)}
                />
                <button type="submit">submit</button>
            </form>
            {subcategories.map((subcategory: ISubcategory) => (
                <div key={subcategory._id}>
                    <SubcategoryCard
                        name={subcategory.name}
                        categoryId={categoryId}
                        subcategoryId={subcategory._id}
                    />
                </div>
            ))}
        </div>
    );
};

export default SubcategoryPage;
