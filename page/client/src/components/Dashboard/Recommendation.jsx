import React, { useState, useEffect, useContext } from "react";
import { Link } from "@material-ui/core";
import Title from "../Template/Title.jsx";
import SaleModal from "./SaleModal";
import styles from "./Dashboard.module.css";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import { makeStyles } from '@material-ui/core/styles';
import Axios from "axios";
import config from "../../config/Config";

import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter
 } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
      borderRadius: 15,
      margin: '10px 10px',
      maxWidth: 1180
  },
  tableHeaderCell: {
      fontWeight: 'bold',
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.getContrastText(theme.palette.primary.dark)
  },
  avatar: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.getContrastText(theme.palette.primary.light)
  },
  name: {
      fontWeight: 'bold',
      color: theme.palette.secondary.dark
  },
  status: {
      fontWeight: 'bold',
      fontSize: '0.75rem',
      color: 'white',
      backgroundColor: 'grey',
      borderRadius: 8,
      padding: '3px 10px',
      display: 'inline-block'
  }
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}



const Recommendations = ({ purchasedStocks }) => {
  const classes = useStyles();

  const roundNumber = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  const [text, setText] = useState("");

  useEffect(() => {

  
      Axios.get(config.base_url + "/api/data/stockrecommendation", { crossdomain: true }).then(response => {
      setText(response.data.informa.recommendat[0]);
    });
    
    }, []);

  const rows = [
    createData(text.name1, "BUY"),
    createData(text.name2, "BUY"),
    createData(text.name3, "BUY"),
    createData(text.name4, "BUY"),
    createData(text.name5, "BUY"),
  ];
    

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Title>Top 5 Daily Stocks Recommendations</Title>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Company Ticker</TableCell>
            <TableCell className={classes.tableHeaderCell}></TableCell>
            <TableCell className={classes.tableHeaderCell}></TableCell>
            <TableCell className={classes.tableHeaderCell}></TableCell>
            <TableCell align="right" className={classes.tableHeaderCell}>Recommendation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {rows.map((row) => (
            <TableRow key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"><b>
              {row.name}</b>
              </TableCell>
              <TableCell align="right"><b>{row.fat}</b></TableCell>
              
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="right">✅</TableCell>
            </TableRow>
          ))}
        </TableBody>
  
      </Table>
    </TableContainer>
  )
  
};

export default Recommendations;
