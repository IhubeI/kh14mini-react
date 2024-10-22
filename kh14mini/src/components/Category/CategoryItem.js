import { useCallback, useEffect, useState } from "react";
import CategoryList from "./CategoryList";
import axios from "axios";
import CategoryMenu from "./CategoryMenu";

const CategoryItem = ({category, selectedCategory, setSelectedCategory, commands})=>{
    const [subList, setSubList] = useState([]);
    const [hover, setHover] = useState(false);
    const [open, setOpen] = useState(false);

    const closeSubList = useCallback(()=>{
        setSubList([]);
        setOpen(false);
    }, [open]);
    const loadSubList = useCallback(async (category)=>{
        const resp = await axios.get(`http://localhost:8080/category/categoryOrigin/${category.categoryCode}`);
        setSubList(resp.data);
        setOpen(true);
    }, [open]);
    const toggleSubList = useCallback((category)=>{
        if(open) {
            closeSubList();
        }
        else {
            loadSubList(category);
        }
        setOpen(!open);
    }, [open]);
    const clickCategory = useCallback((e, category)=>{
        e.stopPropagation();
        toggleSubList(category);
    }, [open]);

    const changeHoverState = useCallback((e, state)=>{
        e.stopPropagation();
        setHover(state);
    }, [category]);

    return (
    <li className="list-group-item" key={category.categoryCode}
        onClick={e=>clickCategory(e, category)}
        onMouseEnter={e=>changeHoverState(e, true)}
        onMouseLeave={e=>changeHoverState(e, false)}>
        {category.categoryName}
        {hover && <CategoryMenu commands={commands} category={category} className="ms-4"/>}
        {subList.length > 0 && (
        <CategoryList categories={subList} commands={commands} className="mt-4"/>
        )}
    </li>
    );
};

export default CategoryItem;