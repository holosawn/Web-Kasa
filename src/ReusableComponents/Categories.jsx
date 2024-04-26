import React, { useCallback, useEffect, useRef, useState } from 'react'
import categoryData from '../Data/WallmartCategoryData.json'
import { Box, Button, Chip, Fade, Grow, IconButton, Stack, Typography, Grid } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ClearIcon from '@mui/icons-material/Clear';

const currCatStyles={
    backgroundColor:'warning.main',
    color: 'white',
}
const currCatHoverStyles={
    backgroundColor:'warning.main',
    color: 'white',
}

 const Categories = ({filterCategories, setFilterCategories}) => {
  const scrollRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  const scroll = (scrollVal)=>{
    const currPos = scrollRef.current.scrollTop;
    scrollRef.current.scrollTo({left:0, top:(currPos + scrollVal), behavior:'auto'})
  }


  const startScroll = (scrollVal) => {
    if(scrollIntervalRef.current === null){
      scrollIntervalRef.current = setInterval(() => {
        scroll(scrollVal);
      }, 1);
    }
  };

  const stopScroll = () => {
    clearInterval(scrollIntervalRef.current);
    scrollIntervalRef.current = null
  };


    const onCategoryClick = useCallback((name, depth) => {

        const catOfDepth = filterCategories[depth]

        if (catOfDepth !== undefined && catOfDepth === name) {
            setFilterCategories(prev => {
                const newArr = [...prev]; // Create a copy of the current array
                newArr.pop(); // Remove the last element
                return newArr; // Return the new array
            });
        }
        else if (catOfDepth !== undefined && catOfDepth !== name ) {

            setFilterCategories(prev => {
                const newArr = [...prev]; // Create a copy of the current array
                newArr[depth] = name; // Remove the last element
                return newArr; // Return the new array
            });
        }
        else if (catOfDepth === undefined) {
            setFilterCategories(prev => {
                const newArr = [...prev]; // Create a copy of the current array
                newArr[depth] = name; // Remove the last element
                return newArr; // Return the new array
            });
        }
    },[filterCategories, setFilterCategories])

    const onChipClick = useCallback(
      (name) => {
        const catPos = filterCategories.indexOf(name);
        const newArr = filterCategories.slice(0, catPos + 1); // Include the clicked category
        setFilterCategories(newArr);
      },
      [filterCategories, setFilterCategories]
    );

    const onChipDeleteClick = useCallback((e,name) => {
      e.stopPropagation()
      const catPos = filterCategories.indexOf(name);
      const newArr = [...filterCategories.slice(0, catPos)];
      setFilterCategories(newArr);
    }, [filterCategories, setFilterCategories]); // Add filterCategories as a dependency

    const largerValue = Math.max(0.15 * window.innerHeight, 100); // Determine the larger value between 15% of window height and 100px
    const heightValue = `calc(90% - ${largerValue}px)`; // Construct the height value

  return (
    <Stack flex={1} width={'100%'} height={heightValue} direction={'column'} justifyContent={'space-between'} alignItems={'center'} >
    <Box mb={{xs:0, lg:2}} width={'100%'} px={2} borderRadius={2} sx={{ overflowY: 'visible' }}>
      <Grid container width={'100%'} my={0.5} rowGap={1} >
        {filterCategories.map(cat =>(
          <Grid item xs={6} key={cat} lg={12} sx={{display:'flex', justifyContent:'center', alignItems:'center'}} >
            <Box bgcolor={'background.default'} onClick={() => onChipClick(cat)} sx={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:{xs:'95%', lg:'85%'}, height:'100%', borderRadius:3, pl:1, my:0.5, cursor:'pointer'}}>
              <Typography textOverflow={'ellipsis'} noWrap variant='subtitle2' fontSize={{xs:'10px', lg:'15px'}}  >{cat}</Typography>
              <Button variant='contained' color='error' onClick={(event) => onChipDeleteClick(event,cat)} sx={{p:'1px', pr:0, minWidth:20, minHeight:0, borderRadius:'50%', mr:0.5}} disableRipple >
                <ClearIcon sx={{fontSize:{xs:'20px', lg:'25px'}, }} />
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
    <Box position={'relative'} flex={1} overflow={'hidden'} width={'100%'} >
    <Box ref={scrollRef} height={`100%`} width={'100%'} borderRadius={2} sx={{ overflowY: 'scroll', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      <Button
        variant='contained'
        color={'warning'}
        sx={{position:'absolute', top:0, right:0, mr:{xs:1, lg:1, xl:2}, my:{xs:0.2, md:0.5}, borderRadius:'100%', width:{xs:20, md:30, lg:45}, height:{xs:30, lg:45}, minWidth:20, minHeight:20 }}
        onMouseDown={()=>startScroll(-7)}
        onMouseUp={stopScroll}
      >
        <KeyboardArrowUpIcon/>
      </Button>

      {renderCategories(categoryData, filterCategories, onCategoryClick)}


      <Button
        variant='contained'
        color={'warning'}
        sx={{position:'absolute', bottom:0, right:0, mr:{xs:1, lg:1, xl:2}, my:{xs:0.2, md:0.5}, borderRadius:'100%', width:{xs:20, md:30, lg:45}, height:{xs:30, lg:45}, minWidth:20, minHeight:20 }}
        onMouseDown={()=>startScroll(7)}
        onMouseUp={stopScroll}
      >
        <KeyboardArrowDownIcon/>
      </Button>
    </Box>
    </Box>
  </Stack>

  )
}

const renderCategories = (catObj, filterCategories, onCategoryClick) => {
  let categories = catObj;
  let depth = 0

  const slicedCategories = filterCategories.slice(0, 3); // Slice the first three elements
  for(const cat of slicedCategories){
      if(Object.keys(categories[cat]).length > 0){
          categories = categories[cat]
          depth += 1
      }
  }

  return (
    Object.entries(categories).map(([catKey]) => {
      // console.log(catKey);
      return (
          <React.Fragment key={catKey} >
              <CategoryCard key={catKey} isCurrent={filterCategories.includes(catKey)} name={catKey} onClick={() => onCategoryClick(catKey, depth)} sx={{ width:`88%`, }} />
              {/* { ( filterCategories.includes(catKey) && Object.entries(value).length) ? renderCategories(value, depth + 1) : null} */}
          </React.Fragment>
          )
    })
  )
}

const CategoryCard = ({ name, onClick, sx, depth, isCurrent, ...props }) => {
    return(
    <Fade in={true}>
    <Stack width={'calc(95% - 45px)'}  >
        <Button variant='contained'  disableElevation onClick={onClick} sx={{
            minHeight: {xs:25, md:35, l:45, lg:46, xl:55},
            m: 0.5,
            width:'95%',
            color:'text.primary',
            overflow:'hidden',
            transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.08)',
                    opacity: '1',
                    color: '#6a4a96',
                    backgroundColor:'background.default',
                    ...((depth !== 0 && isCurrent)? currCatStyles : null),
                },
            backgroundColor: 'background.default',
            justifyContent: 'space-between',
            ...sx,
            ...((depth !== 0 && isCurrent)? currCatHoverStyles : null),
            }}
            {...props}
            >
            <Typography variant='subtitle2'
            fontSize={{xs:10, md:12, lg:16}}
            noWrap overflow={'ellipsis'} textTransform={'none'} >
                {name}
            </Typography>
        </Button>
    </Stack>
    </Fade>
)};


export default Categories