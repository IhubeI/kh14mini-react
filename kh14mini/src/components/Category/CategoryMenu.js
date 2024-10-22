import { useCallback } from "react";
import { FiPlusSquare } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";

const CategoryMenu = ({className, category, commands})=>{

    const clickAddButton = useCallback((e)=>{
        e.stopPropagation();
        if(commands?.addCategory) {
            commands.addCategory(category);
        }
    }, [category, commands]);
    const clickEditButton = useCallback((e)=>{
        e.stopPropagation();
        if(commands?.editCategory) {
            commands.editCategory(category);
        }
    }, [category, commands]);
    const clickRemoveButton = useCallback((e)=>{
        e.stopPropagation();
        if(commands?.removeCategory) {
            commands.removeCategory(category);
        }
    }, [category, commands]);

    return (<span className={className}>
        <FiPlusSquare className="me-2" onClick={clickAddButton}/>
        <FiEdit className="me-2" onClick={clickEditButton}/>
        <FiTrash2 onClick={clickRemoveButton}/> 
    </span>);
};

export default CategoryMenu;