import { Button, Fade, Stack, Typography, } from '@mui/material';
import React from 'react'

// Styles for Category cards
const currCatStyles={
    backgroundColor:'warning.main',
    color: 'white',
}
const currCatHoverStyles={
    backgroundColor:'warning.main',
    color: 'white',
}

// Renders category name with different background color if it's selected
const CategoryCard = ({ name, onClick, isCurrent, buttonSx,  buttonProps, stackProps, typographyProps }) => (
    <Fade in={true}>
    <Stack width={'calc(95% - 45px)'} {...stackProps}  >
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
                    ...((isCurrent)? currCatStyles : null),
                },
            backgroundColor: 'background.default',
            justifyContent: 'space-between',
            ...buttonSx,
            ...((isCurrent)? currCatHoverStyles : null),
            }}
            {...buttonProps}
            >
            <Typography variant='subtitle2'
            fontSize={{xs:10, md:12, lg:16}}
            noWrap overflow={'ellipsis'} textTransform={'none'} {...typographyProps} >
                {name}
            </Typography>
        </Button>
    </Stack>
    </Fade>
);

export default CategoryCard
