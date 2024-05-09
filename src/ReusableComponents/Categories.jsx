import React, { useCallback, useRef} from 'react'
import CategoryCard from './CategoryCard';
import { Box, Button, Stack, Typography, Grid } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ClearIcon from '@mui/icons-material/Clear';


 const Categories = ({categoryData, filterCategories, setFilterCategories}) => {
  // Ref for scrolled component
  const scrollRef = useRef(null);
  // Ref to hold scroll interval
  const scrollIntervalRef = useRef(null);

  // Single scroll execution
  const scroll = (scrollVal)=>{
    const currPos = scrollRef.current.scrollTop;
    scrollRef.current.scrollTo({left:0, top:(currPos + scrollVal), behavior:'auto'})
  }

  // Start scroll interval
  const startScroll = (scrollVal) => {
    if(scrollIntervalRef.current === null){
      scrollIntervalRef.current = setInterval(() => {
        scroll(scrollVal);
      }, 1);
    }
  };

  // End scroll interval
  const stopScroll = () => {
    clearInterval(scrollIntervalRef.current);
    scrollIntervalRef.current = null
  };

  // Recreate func when filterCategories or setFilterCategories changes 
  const onCategoryClick = useCallback((name, depth) => {

    const catOfDepth = filterCategories[depth]// Get the current category at the given depth

  // If the clicked category is already selected at the given depth, deselect it
  if (catOfDepth !== undefined && catOfDepth === name) {
        setFilterCategories(prev => {
            const newArr = [...prev];
            newArr.pop(); 
            return newArr; 
        });
    }
  // If a different category is already selected at the given depth, select the clicked category and deselect the previous one
  else if (catOfDepth !== undefined && catOfDepth !== name ) {

        setFilterCategories(prev => {
            const newArr = [...prev];
            newArr[depth] = name; 
            return newArr; 
        });
    }
  // If no category is selected at the given depth, select the clicked category
  else if (catOfDepth === undefined) {
        setFilterCategories(prev => {
            const newArr = [...prev]; 
            newArr[depth] = name; 
            return newArr; 
        });
    }
  },[filterCategories, setFilterCategories])

  // Removes categories after clicked category
  const onChipClick = useCallback(
    (name) => {
      const catPos = filterCategories.indexOf(name);
      const newArr = filterCategories.slice(0, catPos + 1); // Include the clicked category
      setFilterCategories(newArr);
    },
    [filterCategories, setFilterCategories]
  );

  // Removes clicked category and categories after
  const onChipDeleteClick = useCallback((e,name) => {
    e.stopPropagation()
    const catPos = filterCategories.indexOf(name);
    const newArr = [...filterCategories.slice(0, catPos)];
    setFilterCategories(newArr);
  }, [filterCategories, setFilterCategories]); 

  // Heigth computing for Stack component
  const largerValue = Math.max(0.15 * window.innerHeight, 100); 
  const heightValue = `calc(85% - ${largerValue}px)`; 

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

// catObj is object of parent category which contains child categories
const renderCategories = (catObj, filterCategories, onCategoryClick) => {
  let categories = catObj;
  let depth = 0


  // Calculate depth
  for(const cat of filterCategories){
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
              <CategoryCard key={catKey} isCurrent={filterCategories.includes(catKey)} name={catKey} onClick={() => onCategoryClick(catKey, depth)} buttonSx={{ width:`88%`, }} />
          </React.Fragment>
          )
    })
  )
}


export default React.memo(Categories)