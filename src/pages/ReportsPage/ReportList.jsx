import { Box, Divider, Fade, Grow, Stack, Typography } from '@mui/material'
import React, { useMemo } from 'react'

const ReportList = ({reports, filterValues}) => {

    const filteredReports = useMemo(()=>{
        return reports.filter(rp =>{

            if (filterValues.id !== '' && !rp.id.toLowerCase().includes(filterValues.id.toLowerCase())) {
                return false
            }
            if (filterValues.shop !== '' && !rp.shop.toLowerCase().includes(filterValues.shop.toLowerCase()) ) {
                return false
            }
            if (new Date(filterValues.startDate).getTime() > new Date(rp.date).getTime()) {
                return false
            }
            if (new Date(rp.date).getTime() > new Date(filterValues.endDate).getTime()) {
                return false
            }
            return true
        })
    },[filterValues])

  return (
    <Box width={'30%'} height={'100%'} minHeight={0} sx={{backgroundColor:'background.paper', pt:1, borderRadius:3, displayPrint:'none'}} >
        <Typography color={'primary'} width={'100%'} display={'flex'} justifyContent={'center'} >
            Reports
        </Typography>
        <Divider flexItem sx={{mb:1, }}/>
        <Stack height={'90%'} minHeight={170} sx={{px:1.5, pt:0.5, mr:0.5, overflowY:'scroll',  }}>
        {filteredReports.length === 0 ? (
            <Typography color={'text.secondary'} mt={2} variant="body1">No reports found in specified date range.</Typography>
        ) : (
            filteredReports.map((rp) => <ReportCard key={rp.id} report={rp} />)
        )}
        </Stack>



    </Box>
  )
}

const ReportCard= ({report})=>{

    const dateStr = new Date(report.date).toISOString().split('T')[0]
    return(
        <Grow in={true} >
            <div>
                <Box sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    p: 1,
                    my: 0.5,
                    border: '0.2px solid #E0E0E0',
                    transition: "transform 0.2s ease, background-color 0.2s ease", // Add a transition for smooth scaling and background-color change
                    "&:hover": {
                    cursor: "pointer",
                    transform: "scale(1.05)",
                    backgroundColor: 'action.hover', // Use the MUI hover color
                    },
                    "&:active": {
                    transform: "scale(1)", // Reduce the scale slightly on click
                    backgroundColor: 'action.selected', // Use the MUI active color
                    },
                }}>
                    <Typography color={"primary"} >{report.id}</Typography>

                    <Divider style={{width:'100%',}} />
                    <Stack direction={'row'} >
                        <Typography color={"secondary"} sx={{fontSize:{xs:11, md:14}, }} >Date:</Typography>
                        <Typography  sx={{fontSize:{xs:11, md:14}, pl:1.6}} > {dateStr}</Typography>
                    </Stack>

                    <Stack direction={'row'} >
                        <Typography color={"secondary"} sx={{fontSize:{xs:11, md:14}}}>Store:</Typography>
                        <Typography  sx={{fontSize:{xs:11, md:14}, pl:1}}> {report.shop}</Typography>
                        {/* <Typography ml={'auto'} >Kapaklı Şube</Typography> */}

                    </Stack>
                </Box>
            </div>
        </Grow>

    )
}

export default ReportList
