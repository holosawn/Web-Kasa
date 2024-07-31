import { Box, Divider, Grow, Stack, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { formatDateTimeString } from '../../helpers/helpers'
import { t } from 'i18next'

const ReportList = ({reports, filterValues, currentReport, setCurrentReport}) => {

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
        }).sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
    },[filterValues])

    const onReportCardClick = (report)=>{
        setCurrentReport(report)
    }

  return (
    <Box width={'30%'} height={'100%'} minHeight={220} sx={{backgroundColor:'background.paper', pt:{xs:0, md:1}, borderRadius:3, displayPrint:'none'}} >
        <Typography fontSize={{xs:15, md:20}} color={'primary'} width={'100%'} display={'flex'} justifyContent={'center'} >
            {t('reports.reports')}
        </Typography>
        <Divider flexItem sx={{mb:0.5, }}/>
        <Stack height={{xs:'80%', sm:'calc(100% - 35px)', md:'calc(100% - 50px)'}} minHeight={0} sx={{px:1.5, pt:0.5, mr:0.5, overflowY:'scroll',  }}>
        {filteredReports.length === 0 ? (
            <Typography color={'text.secondary'} mt={2} variant="body1">{t('reports.noReports')}</Typography>
        ) : (
            filteredReports.map((rp) => <ReportCard key={rp.id} currentReport={currentReport} report={rp} onClick={()=>onReportCardClick(rp)} />)
        )}
        </Stack>



    </Box>
  )
}

const ReportCard= ({report, onClick, currentReport})=>{

    const dateStr = formatDateTimeString(new Date(report.date)).split(" ")[0]
    return(
        <Grow in={true} >
            <div>
                <Box onClick={onClick} sx={{
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
                    ...(currentReport && currentReport.id === report.id && {
                        backgroundColor: 'action.selected',
                      }),
                }}>
                    <Typography color={"primary"} fontSize={{xs:13, md:15, lg:20}} >{report.id}</Typography>

                    <Divider style={{width:'100%',}} />
                    <Stack direction={'row'} alignItems={'center'}>
                        <Typography color={"secondary"} sx={{fontSize:{xs:11, md:14}, }} >{t('reports.date')}:</Typography>
                        <Typography  sx={{fontSize:{xs:11, md:14}, pl:1.6}} > {dateStr}</Typography>
                    </Stack>

                    <Stack direction={'row'} alignItems={'center'}>
                        <Typography color={"secondary"} sx={{fontSize:{xs:11, md:14}}}>{t('reports.shop')}:</Typography>
                        <Typography  sx={{fontSize:{xs:11, md:14}, pl:1, lineHeight:1}}> {report.shop}</Typography>
                        {/* <Typography ml={'auto'} >Kapaklı Şube</Typography> */}

                    </Stack>
                </Box>
            </div>
        </Grow>

    )
}

export default ReportList
