import React from 'react'
import { Box, ListItem, Typography, List, ListItemText } from '@mui/material'


const TopSoldCard = () => {
  return (
    <Box width={'90%'} height={90} display={'flex'} flexDirection={'row'} alignItems={'center'} ml={'auto'} mr={'auto'} borderBottom={'0.5px solid #E8E8E8'} >
        <Box height={'60%'} sx={{backgroundColor:'yellow', aspectRatio:'1'}} borderRadius={2} ></Box>
        <Box mx={1}>
            <Typography>Kek</Typography>
            <Box display={'flex'} flexDirection={'row'}>
                <Typography borderRadius={1} sx={{backgroundColor:'#E3ECFC'}} color={'#5A8DEF'} mr={1} >
                    1000 sales
                </Typography>
                <Typography borderRadius={1} sx={{backgroundColor:'#DEF9EB'}} color={'#39DA8A'} >
                    TRY 100.209,00
                </Typography>
            </Box>
        </Box>
        <Typography ml={'auto'} mr={1}>
           30% 
        </Typography>
    </Box>
  )
}

const TopEntitiesList=()=>(
    <Box
    width={{ md: "34.5%", xs: '98%' }}
    height={510}
    sx={{
        backgroundColor: "white",
        display: 'flex',
        flexDirection: 'column'
    }}
    mx={1}
    mt={{ xs: 2, md: 0 }}
    borderRadius={5}
    >
    <Typography m={3}>Top Sale Products</Typography>
    <Box flex={1} mb={2} sx={{ overflowY: 'auto' }}>
        <TopSoldCard />
        <TopSoldCard />
        <TopSoldCard />
        <TopSoldCard />
        <TopSoldCard />
        <TopSoldCard />
        <TopSoldCard />
        <TopSoldCard />
    </Box>
    </Box>
)

export default TopEntitiesList