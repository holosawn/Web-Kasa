import React from 'react'
import { Box, Typography, Paper } from '@mui/material'
import { useCustomTheme } from '../../../contexts/CutomThemeContext'
import { t } from 'i18next';
import { useLanguage } from '../../../contexts/LangContext';


const TopSoldCard = ({entity, totalSale}) => {
    const {mode} = useCustomTheme();
    const {lang, setLang} = useLanguage();

  return (
    <Box width={'90%'} height={90} display={'flex'} flexDirection={'row'} alignItems={'center'} ml={'auto'} mr={'auto'} borderBottom={'0.5px solid #E8E8E8'} >
        <Box height={'60%'} sx={{backgroundColor:entity.color, aspectRatio:'1'}} borderRadius={2} ></Box>
        <Box mx={1}>
            <Typography>{entity.name[lang]}</Typography>
            <Box display={'flex'} flexDirection={'row'}>
                <Typography borderRadius={1} sx={{backgroundColor: mode === 'light' ? '#E3ECFC' : '#151c29'}} color={'#5A8DEF'} mr={1} >
                    {entity.qty} {t('menu.sales')}
                </Typography>
                <Typography borderRadius={1} sx={{backgroundColor:mode === 'light' ? '#DEF9EB' : '#002411'}} color={'#39DA8A'} >
                    {entity.totalSale} TRY
                </Typography>
            </Box>
        </Box>
        <Typography ml={'auto'} mr={1}>
           {(entity.qty * 100 / totalSale).toFixed(1)}%
        </Typography>
    </Box>
  )
}

// Renders Entities with their sale info
const TopEntitiesList=({topSoldEntities, totalSale, label, timeline})=>{
    return(
        <Paper
        sx={{
            display: 'flex',
            flexDirection: 'column',
            height:510,
            width:{ md: "34.5%", xs: '98%' },
            mx:1,
            mt:{ xs: 2, md: 0 },
            borderRadius:5
        }}
        >
        <Typography m={3}>{t(`dashboard.${timeline}`)} {label}</Typography>
        <Box flex={1} mb={2} sx={{ overflowY: 'auto' }}>
            {topSoldEntities.map(entity => (
                <TopSoldCard entity={entity} totalSale={totalSale} key={entity.id}/>
            ))}
        </Box>
        </Paper>
)}

export default TopEntitiesList