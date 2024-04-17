import {
  Modal,
  Fade,
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";

const AddCustomer = ({ open, closeModal }) => {
    const [size, setSize] = useState({x:window.innerWidth, y:window.innerHeight})    
  const [customer, setCustomer] = useState({
    name: "",
    surname: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    function handleResize() {
      setSize({x:window.innerWidth, y:window.innerHeight})
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // You can handle form submission here, e.g., send data to server
    console.log(customer);
    // Clear form fields after submission
    setCustomer({
      name: "",
      surname: "",
      phoneNumber: "",
      email: "",
    });
    // Close modal
    closeModal();
  };

  return open ? (
    <Modal
      open={open}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      closeAfterTransition
      onClose={closeModal}
      sx={{
        zIndex: 9999,
      }}
    >
      <Fade in={open}>
        <Grid
          container
          position={"absolute"}
          left={"50%"}
          top={"50%"}
          bgcolor={"background.paper"}
          minWidth={400}
          maxWidth={700}
          width={'50%'}
          minHeight={250}
          maxHeight={400}
          height={'60%'}
          rowGap={{xs:0, md:2}}
          sx={{
            transform: "translate(-50%,-50%)",
            borderRadius: 3,
          }}
        >
          <Grid item xs={12} mt={{ xs: 1, md: 2 }} sx={styles.gridItem}>
            <Typography
              variant="h7"
              textTransform={"none"}
              fontSize={{xs:14, md:18}}
              fontWeight={500}
              mb={{ xs: 1, md: 1 }}
            >
              Add Customer
            </Typography>
            <Divider style={{ width: "100%" }} />
          </Grid>

          <Grid item xs={6} sx={{...styles.gridItem, alignItems:'end', pr:2}}>
            <TextField
              sx={{ 
                ...styles.typography,
                mt:1,
              }}
              label="Name"
              name="name"
              size={ size.y < 500 ? "small" : 'large'}
              value={customer.name}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6} sx={{...styles.gridItem, alignItems:'start', pl:2}}>
            <TextField
              sx={{
                ...styles.typography,
                mt:1
              }}
              label="Surname"
              name="surname"
              size={ size.y < 500 ? "small" : 'large'}
              value={customer.surname}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sx={styles.gridItem}>
            <TextField
              sx={{
                ...styles.typography,
                width: "80%",
                

              }}
              label="Phone Number"
              name="phoneNumber"
              size={ size.y < 500 ? "small" : 'large'}

              value={customer.phoneNumber}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sx={styles.gridItem}>
            <TextField
              sx={{
                ...styles.typography,
                width: "80%",

              }}
              label="Email"
              name="email"
              size={ size.y < 500 ? "small" : 'large'}

              value={customer.email}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} mb={{xs:1,md: 2 }} mt={{xs:0}} sx={styles.gridItem}>
            <Button variant="contained" size="large" onClick={handleSubmit}>
              <Typography textTransform={"none"}>Add Customer</Typography>
            </Button>
          </Grid>
        </Grid>
      </Fade>
    </Modal>
  ) : null;
};

const styles = {
  gridItem: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // px:1,
    px:6
  },
  typography:{
    mt:0,
  }
};
export default AddCustomer;
