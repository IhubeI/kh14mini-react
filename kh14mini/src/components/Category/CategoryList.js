import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import CategoryItem from "./CategoryItem";

const CategoryList = ({categories, className, commands, selectedCategory, setSelectedCategory})=>{

    return (categories.length > 0 && (<>
        <ul className={`list-group list-group-flush ${className && ' ' + className}`}
            style={{cursor: "pointer"}}>
            {categories.map(category=>(
                <CategoryItem category={category} 
                    selectedCategory={selectedCategory} 
                    setSelectedCategory={setSelectedCategory}
                    key={category.categoryCode}
                    commands={commands}/>
            ))}
        </ul>
    </>));
};

export default CategoryList;