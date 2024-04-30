import { useLanguage } from "../contexts/LangContext";



const getNumLayout =(t)=>{

  const onlyNumLayout=[
    {
      name: "1",
    },
    {
      name: "2",
    },
    {
      name: "3",
    },
    {
      name: "Delete",
      onClick: (setVal) =>
        setVal((prev) => {
          if (prev && prev.length > 0) return prev.slice(0, -1);
          else return prev
        }),
      color: "warning",
  },
    {
      name: "4",
    },
    
    {
      name: "5",
    },
    {
      name: "6",
    },
    {
      name: t('sale.clear'),
      onClick: (setVal) =>
          setVal((prev) => {
          if (prev && prev.length > 0) return prev.slice(0, -prev.length);
          else return prev
          }),
      color: "warning",
  },
    {
      name: "7",
    },
    
    {
      name: "8",
    },
    
    {
      name: "9",
    },
    {
      name: "0",
    },
    {
      name: 'Space',
      onClick: (setVal) => setVal((prev) => prev + ' '),
    },
    {
      name: "00",
    },
]

return onlyNumLayout
}

export {getNumLayout};