import React, { useState } from 'react';
import { Box, Button, Paper, Tooltip, Typography } from '@mui/material';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import { useNavigate } from 'react-router-dom';


const currentMainCategoryStyles={
    // backgroundColor:'#191970',
    backgroundColor:'primary.main',
    color: 'white', 
    '&:hover': {
        // backgroundColor:'#191970',
        backgroundColor:'primary.main',
        color: 'white', 
    },
}
const currentSubCategoryStyles={
    // backgroundColor:'#191970',
    backgroundColor:'secondary.main',
    color: 'white', 
    '&:hover': {
        // backgroundColor:'#191970',
        backgroundColor:'secondary.main',
        color: 'white', 
    },
}

const exampleCategories=[
    {
        name: 'All',
        categoryType: 'main'
    },
    {
        name: 'Vegetables',
        categoryType: 'main'
    },
    {
        name: 'Snack',
        categoryType: 'main'
    },
    {
        name: 'Cakes',
        categoryType: 'sub',
        main:'Snack'
    },
    {
        name: 'White',
        categoryType: 'sub',
        main:'Vegetables'
    },
    {
        name: 'Green',
        categoryType:'sub',
        main:'Vegetables'
    },
    {
        name: 'Red',
        categoryType:'sub',
        main:'Vegetables'
    },
    {
        name:'Chocolate',
        categoryType:'sub',
        main:'Snack'
    }
]

const Categories = ({currCategory, setCurrCategories}) => {
    const [isSubsVisible, setisSubsVisible] = useState()
    const navigate = useNavigate();


    const onMainCategoryClick=(name)=>{
      setCurrCategories({main:name, sub:''})  
      if(name !== currCategory.main) setisSubsVisible(true);
      else setisSubsVisible(prev => !prev);
    };

    const onSubCategoryClick = (name) => {
        if (currCategory.sub !== name ) {
            setCurrCategories((prev) => ({
                ...prev,
                sub: name
            }))
        }
        else
        {
            setCurrCategories(prev => ({
                ...prev,
                sub:''
            }))
        }
    };

    const renderMainCategory = (mainCategory) => (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} key={mainCategory.name} sx={{overflowY:'auto', overflowX:'visible',width:'100%'}} >
            <CategoryCard category={mainCategory} 
            key={mainCategory.name} 
            onClick={()=>onMainCategoryClick(mainCategory.name)} 
            sx={mainCategory.name === currCategory.main && currentMainCategoryStyles}
            endIcon={<ArrowDropDownSharpIcon/>}
            />
            {currCategory.main === mainCategory.name && isSubsVisible && renderSubCategories(mainCategory)}
        </Box>
    );
    
    const renderSubCategories = (mainCategory) => {

        if (mainCategory.name === 'All') {
            return exampleCategories
                .filter(category => category.categoryType === 'sub')
                .map(subCategory =>(
                    <CategoryCard category={subCategory} sx={{width:'65%', ...(subCategory.name === currCategory.sub && currentSubCategoryStyles)}} key={subCategory.name} onClick={()=> onSubCategoryClick(subCategory.name)} />
                ));
        } else {
            
            return exampleCategories
                .filter(category => category.categoryType === 'sub' && category.main === mainCategory.name)
                .map(subCategory => (
                    <CategoryCard category={subCategory} sx={{width:'65%', ...(subCategory.name === currCategory.sub && currentSubCategoryStyles)}} key={subCategory.name} onClick={()=> onSubCategoryClick(subCategory.name)} />
                ));
        }
    };
    

    return (
        <Box width={'25%'} height={'90vh'} sx={{overflowY:'auto', display:'flex', flexDirection:'column', alignItems:'center'}}>
            {exampleCategories
                .filter(category => category.categoryType === 'main')
                .map(renderMainCategory)}

            <Button variant='contained' color='primary' onClick={()=> navigate('/Menu')} sx={{width:'90%', m:1, mt:'auto'}}>
            Back
            </Button>
        </Box>
    );
};

const CategoryCard = ({ category, onClick, sx, ...props }) => {
    const { '&:hover': hoverProps, ...newSx } = sx;
    return(
    <Button variant='contained' disableElevation onClick={onClick} sx={{
        height: 30, 
        m: 0.5,
        width:'90%',
        color:'text.primary',
        transition: 'transform 0.2s ease-in-out',
            '&:hover': {
                transform: 'scale(1.08)',
                opacity: '1',
                color: '#6a4a96', 
                backgroundColor:'background.paper',
                ...hoverProps 
            },
        backgroundColor: 'background.paper',
        justifyContent: 'space-between',
        ...newSx
        }}
        {...props}
        >
        <Typography variant='h8' textTransform={'none'} >
            {category.name}
        </Typography>
    </Button>
)};

export default Categories;
